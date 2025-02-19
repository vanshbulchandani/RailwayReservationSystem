const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ServerConfig = require("./config");
const trainRoutes = require("./routes/trainRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const app = express();

//console.log(Logger);

app.use(express.json());
app.use("/api/trains", trainRoutes);
app.use("/api/bookings", bookingRoutes);
app.use(cors());

app.listen(ServerConfig.PORT, () => {
  console.log(`Server succesfully started on port ${ServerConfig.PORT}`);
});
