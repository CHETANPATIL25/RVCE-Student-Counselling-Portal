const { authJwt } = require("../middlewares");
const controller = require("../controllers/student.controller");
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
  "/api/student/getall",
  [authJwt.verifyToken],
  controller.fetchAllDetails
);
app.post(
  "/api/student/save",
  [authJwt.verifyToken],
  controller.SaveUserDetails
);
app.post(
  "/api/student/add-counsoller",
  [authJwt.verifyToken],
  controller.addCounsoller
);
app.post(
  "/api/student/getbyid",
  [authJwt.verifyToken],
  controller.fetchLimitedStudent
);

module.exports = app;
