// #region imports
const url = require("url");
const { send } = require("micro");
const querystring = require("querystring");
const { google } = require("googleapis");
const uuid = require("uuid");
const redirect = require("micro-redirect");
const { MongoClient: Mongo } = require("mongodb");
// #endregion imports

const provider = "google";
const { OAuth2 } = google.auth;
const plus = google.plus("v1");

const options = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/auth/google/callback"
      : "https://grow-me.now.sh/auth/google/callback",
  scopes: ["profile", "email"],
};

function getToken(client, code) {
  return new Promise((resolve, reject) => {
    client.getToken(code, (err, tokens) => {
      if (err) {
        return reject(err);
      }

      client.setCredentials(tokens);

      resolve(tokens);
    });
  });
}

function getUser(client) {
  return new Promise((resolve, reject) => {
    plus.people.get({ userId: "me", auth: client }, (err, response) => {
      if (err) {
        return reject(err);
      }

      resolve(response);
    });
  });
}

const states = [];
const client = new OAuth2(
  options.clientId,
  options.clientSecret,
  options.callbackUrl,
);
const scope = ["https://www.googleapis.com/auth/userinfo.email"];

module.exports = async (req, res) => {
  const { pathname, query } = url.parse(req.url);

  if (pathname === "/api/login") {
    const state = uuid.v4();
    states.push(state);

    const redirectURL = client.generateAuthUrl({
      access_type: "offline",
      scope,
      state,
    });

    return redirect(res, 302, redirectURL);
  }

  if (pathname === "/auth/google/callback") {
    const { state, code } = querystring.parse(query);

    if (states.includes(state)) {
      states.splice(states.indexOf(state), 1);

      const tokens = await getToken(client, code);

      if (!tokens.error) {
        const user = await getUser(client);
        const { access_token } = tokens;
        const {
          data: { id, emails, name, image },
        } = user;

        const email = emails[0].value;

        const mongoClient = await Mongo.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
        });

        const users = mongoClient.db("grow-me").collection("users");

        if (!(await users.findOne({ email }))) {
          await users.insertOne({
            _id: id,
            firstName: name.givenName,
            lastName: name.familyName,
            name,
            email,
            picture: image.url,
          });
        }

        await mongoClient.close();

        return redirect(res, 302, `/?t=${access_token}`);
      }
    }
  }

  res.end();
};
