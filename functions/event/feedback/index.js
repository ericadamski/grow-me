// #region imports
const { json } = require("micro");
const { MongoClient: Mongo } = require("mongodb");
// #endregion imports

module.exports = async (req, res) => {
  const { id, feedback } = await json(req);

  const client = await Mongo.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

  await client
    .db("grow-me")
    .collection("events")
    .updateOne({ _id: id }, { $push: { feedback } });

  await client.close();

  res.end();
};
