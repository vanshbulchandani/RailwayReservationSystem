const express = require("express");
const { bookTicket, cancelTicket, getTicketStatus } = require("../controllers");
const router = express.Router();
router.post("/book", bookTicket);
router.post("/cancel", cancelTicket);
router.get("/status/:bookingId", getTicketStatus);
module.exports = router;
