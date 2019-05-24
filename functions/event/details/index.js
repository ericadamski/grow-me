// #region imports
const { json } = require("micro");
const { MongoClient: Mongo } = require("mongodb");
// #endregion imports

module.exports = async (req, res) => {
  const { id } = await json(req);

  const client = await Mongo.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

  const data = await client
    .db("grow-me")
    .collection("events")
    .findOne({ _id: id }, { projection: { _id: 0, description: 1, name: 1 } });

  await client.close();

  res.end(JSON.stringify(data));
};