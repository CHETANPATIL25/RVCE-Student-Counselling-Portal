const mongoose = require("mongoose");

const Expired_token = mongoose.model(
  "Expired_token",
  new mongoose.Schema({
    accessToken: String,
  })
);

module.exports = Expired_token;
