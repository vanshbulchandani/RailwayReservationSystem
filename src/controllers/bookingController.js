const Booking = require("../models/Booking");
const Train = require("../models/Train");
const { v4: uuidv4 } = require("uuid");

exports.bookTicket = async (req, res) => {
  const { trainId } = req.body;
  const train = await Train.findById(trainId);
  if (!train || train.availableSeats <= 0)
    return res.status(400).json({ message: "No seats available" });

  const booking = new Booking({
    trainId,
    seatNumber: train.seats - train.availableSeats + 1,
    bookingId: uuidv4(),
  });
  await booking.save();
  train.availableSeats -= 1;
  await train.save();
  res.json({
    success: true,
    message: "Ticket booked",
    bookingId: booking.bookingId,
  });
};

exports.cancelTicket = async (req, res) => {
  const { bookingId } = req.body;
  const booking = await Booking.findOneAndDelete({ bookingId });
  if (!booking)
    return res
      .status(404)
      .json({ success: false, message: "Booking not found" });

  const train = await Train.findById(booking.trainId);
  train.availableSeats += 1;
  await train.save();
  res.json({ success: true, message: "Ticket cancelled" });
};

exports.getTicketStatus = async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findOne({ bookingId });
  if (!booking)
    return res
      .status(404)
      .json({ success: false, message: "Booking not found" });
  res.json({
    success: true,
    trainId: booking.trainId,
    seatNumber: booking.seatNumber,
  });
};
