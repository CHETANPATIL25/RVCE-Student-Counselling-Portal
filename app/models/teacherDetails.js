const mongoose = require("mongoose");

const TeacherDetails = mongoose.model(
  "TeacherDetails",
  new mongoose.Schema({
    username: String,
    email: String,
    profile_pic_url: String,
    mobile_number: String,
    designation: String,
    address: String,
    studentlist: [
      new mongoose.Schema({
        email: String,
        id: String,
      }),
    ],
  })
);
module.exports = TeacherDetails;
