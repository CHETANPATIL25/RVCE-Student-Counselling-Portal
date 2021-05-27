const { authJwt } = require("../middlewares");
const controller = require("../controllers/teacher.controller");
const express = require("express");
const bodyParser = require("body-parser");
const app = express.Router();

// parse requests of content-type - application/json
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.get(
  "/api/teacher/getall",
  [authJwt.verifyToken],
  controller.fetchTeacherList
);

app.post(
  "/api/teacher/getbyid",
  [authJwt.verifyToken],
  controller.fetchLimitedTeacher
);
app.post(
  "/api/teacher/data",
  [authJwt.verifyToken],
  controller.fetchTeacherData
);

app.post(
  "/api/teacher/save",
  [authJwt.verifyToken],
  controller.SaveUserDetails
);

app.post(
  "/api/teacher/fetchstudentwholedetails",
  [authJwt.verifyToken],
  controller.fetchStudentWholeDetails
);
module.exports = app;
