const jwt_decode = require("jwt-decode");
const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  let header = req.headers["x-access-token"];
  var decoded = jwt_decode(header);

  User.findOne({ username: decoded.username }, (err, role) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      status: true,
      id: role._id,
      username: role.username,
      email: role.email,
    });
  });
};
