const mongoose = require("mongoose");

const Semester = mongoose.model(
  "Semester",
  new mongoose.Schema({
    username: String,
    email: String,
    year_of_registration: String,
    current_semester_int: Number,
    current_semester_str: String,
    usn: String,
    registrationDetails: [
      new mongoose.Schema({
        course_code: String,
        course_name: String,
      }),
    ],
    previous_semester_result: [
      new mongoose.Schema({
        semester: String,
        sgpa: String,
        cgpa: String,
      }),
    ],
    backlog_details: [
      new mongoose.Schema({
        semester: String,
        course_code: String,
        course_name: String,
      }),
    ],
    internship_details: new mongoose.Schema({
      company_name: String,
      address: String,
      designation: String,
      intership: String,
      salary_package: String,
    }),
  })
);

module.exports = Semester;
