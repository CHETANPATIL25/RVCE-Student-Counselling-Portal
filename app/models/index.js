const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.logout = require("./expiredtoken.model");
db.Student = require("./studentDetails");
db.ROLES = ["user"];

module.exports = db;
