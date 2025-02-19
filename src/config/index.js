const { connect } = require("mongoose");

module.exports = {
  Logger: require("./logger-config"),
  ServerConfig: require("./server-config"),
  connectToDB: require("./database.js"),
};
