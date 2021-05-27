const mongoose = require("mongoose");

const StudentPersonalDetails = mongoose.model(
  "StudentPersonalDetails",
  new mongoose.Schema({
    username: String,
    email: String,
    profile_pic_url: String,
    mobile_number: String,
    blood_group: String,
    category: String,
    gender: String,
    pan_number: String,
    adhaar_number: String,
    permanentAddress: String,
    presentAddress: String,
    permanentAddressPinCode: Number,
    presentAddressPinCode: Number,
    father_name: String,
    mother_name: String,
    local_guardian_name: String,
    father_occupation: String,
    mother_occupation: String,
    local_guardian_occupation: String,
    father_email: String,
    mother_email: String,
    local_guardian_emial: String,
    father_phone_no: String,
    mother_phone_no: String,
    local_guardian_phone_no: String,
    parent_office_address: String,
    person_to_be_contacted_in_emergency: String,
    rank: String,
    rank_percentile: String,
    counsellorlist: [
      new mongoose.Schema({
        email: String,
        id: String,
      }),
    ],
    semesterlist: [
      new mongoose.Schema({
        id: String,
        number: String,
      }),
    ],
  })
);

module.exports = StudentPersonalDetails;
