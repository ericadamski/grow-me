// #region imports
const { json } = require("micro");
const { MongoClient: Mongo } = require("mongodb");
// #endregion imports

module.exports = async (req, res) => {
  const { description, name, userId, reference } = await json(req);

  const client = await Mongo.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

  await client
    .db("grow-me")
    .collection("events")
    .insertOne({ description, name, user: userId, feedback: [], reference });

  await client.close();

  res.end();
};
