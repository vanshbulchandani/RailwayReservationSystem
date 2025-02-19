const BookingSchema = new mongoose.Schema({
  trainId: mongoose.Schema.Types.ObjectId,
  seatNumber: Number,
  bookingId: String,
});
module.exports = mongoose.model("Booking", BookingSchema);
