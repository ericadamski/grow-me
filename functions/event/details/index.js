// #region imports
const { json } = require("micro");
const { MongoClient: Mongo } = require("mongodb");
// #endregion imports

module.exports = async (req, res) => {
  const { id } = await json(req);

  const client = await Mongo.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

  const data = (await client
    .db("grow-me")
    .collection("events")
    .aggregate([
      {
        $match: { reference: +id },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          "user._id": 0,
          _id: 0,
          feedback: 0,
        },
      },
    ])
    .toArray())[0];

  console.log(data);

  await client.close();

  res.end(JSON.stringify(data));
};
