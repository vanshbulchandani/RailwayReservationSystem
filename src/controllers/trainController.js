const Train = require("../models/Train");
exports.getAllTrains = async (req, res) => {
  const trains = await Train.find();
  res.json(trains);
};
