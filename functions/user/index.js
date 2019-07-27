// #region imports
const { json } = require("micro");
const { MongoClient: Mongo } = require("mongodb");
const { google } = require("googleapis");
// #endregion imports

const { OAuth2 } = google.auth;
const plus = google.plus("v1");

const options = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

const authClient = new OAuth2(options);

module.exports = async (req, res) => {
  const { access_token, refresh_token } = JSON.parse(req.headers.authorization);

  if (!(access_token && refresh_token)) {
    throw new Error("Invalid request.");
  }

  authClient.setCredentials({ access_token, refresh_token });

  const { data } = await new Promise((resolve, reject) => {
    plus.people.get({ userId: "me", auth: authClient }, (err, response) => {
      if (err) {
        return reject(err);
      }

      resolve(response);
    });
  });

  const user = {
    _id: data.id,
    email: data.emails.find(({ type }) => type === "account").value,
    displayName: data.displayName,
    name: data.name,
    ...data.name,
    picture: data.image.url,
  };

  const client = await Mongo.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

  const userData = (await client
    .db("grow-me")
    .collection("users")
    .aggregate([
      {
        $match: {
          _id: user._id,
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "user",
          as: "feedback",
        },
      },
    ])
    .toArray())[0];

  /**
   * The user doesn't have an account yet
   */
  if (!userData) {
    await client
      .db("grow-me")
      .collection("users")
      .insertOne(user);
  }

  await client.close();

  res.end(JSON.stringify(userData || { ...user, feedback: [] }));
};
