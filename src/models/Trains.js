const mongoose = require("mongoose");
const TrainSchema = new mongoose.Schema({
  name: String,
  seats: Number,
  availableSeats: Number,
});
module.exports = mongoose.model("Train", TrainSchema);
