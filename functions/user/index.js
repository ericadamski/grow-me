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
  const { access, refresh } = await json(req);

  if (!(access && refresh)) {
    return res.end();
  }

  authClient.setCredentials({ access_token: access, refresh_token: refresh });

  const { data: user } = await new Promise((resolve, reject) => {
    plus.people.get({ userId: "me", auth: authClient }, (err, response) => {
      if (err) {
        return reject(err);
      }

      resolve(response);
    });
  });

  const client = await Mongo.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

  const data = (await client
    .db("grow-me")
    .collection("users")
    .aggregate([
      {
        $match: {
          _id: user.id,
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

  await client.close();

  res.end(JSON.stringify(data));
};
