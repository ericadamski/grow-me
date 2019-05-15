// #region imports
const { json } = require("micro");
const { MongoClient: Mongo } = require("mongodb");
const fetch = require("isomorphic-unfetch");
// #endregion imports

module.exports = async (req, res) => {
  const { token } = await json(req);

  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
  );
  const { user_id } = await response.json();

  const client = await Mongo.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

  const data = await client
    .db("grow-me")
    .collection("users")
    .findOne({ _id: user_id });

  await client.close();

  res.end(JSON.stringify(data));
};
