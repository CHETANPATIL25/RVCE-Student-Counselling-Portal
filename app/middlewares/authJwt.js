const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const expiredToken = db.logout;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(200)
      .send({ status: false, message: "No token provided!" });
  }

  expiredToken.findOne({ accessToken: token }, (err, expired_token) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (expired_token == null) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res
            .status(200)
            .send({ status: false, message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
      });
    } else {
      return res
        .status(200)
        .send({ status: false, message: "Token is Expired" });
    }

    return;
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
