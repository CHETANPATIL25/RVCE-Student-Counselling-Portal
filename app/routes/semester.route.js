const { authJwt } = require("../middlewares");
const controller = require("../controllers/semester.controller");
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
app.post(
  "/api/semester/update",
  [authJwt.verifyToken],
  controller.updateSemester
);

app.post("/api/semester/create", [authJwt.verifyToken], controller.create);
app.post("/api/semester/get", [authJwt.verifyToken], controller.getSemester);
app.post(
  "/api/semester/student-semester-list",
  [authJwt.verifyToken],
  controller.getStudentSemesterList
);

module.exports = app;
