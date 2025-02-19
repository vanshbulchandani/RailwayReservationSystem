const express = require("express");
const { getAllTrains } = require("../controllers");
const router = express.Router();
router.get("/", getAllTrains);
module.exports = router;
