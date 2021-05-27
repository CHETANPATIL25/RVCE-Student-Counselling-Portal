const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const express = require("express");
const bodyParser = require("body-parser");
const app = express.Router();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.get("/api/test/all", controller.allAccess);

app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

module.exports = app;
