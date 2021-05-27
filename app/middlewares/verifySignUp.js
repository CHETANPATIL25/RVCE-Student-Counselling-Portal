const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  // User.findOne({
  //   username: req.body.username,
  // }).exec((err, user) => {
  //   if (err) {
  //     res.status(500).send({ message: err });
  //     return;
  //   }

  //   if (user) {
  //     res.status(200).send({
  //       status: false,
  //       message: " Username is already in use!",
  //     });
  //     return;
  //   }

  // Email
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res
        .status(200)
        .send({
          status: false,
          message: "Email is already in use!",
          errType: "email",
        });
      return;
    }

    next();
  });
  // });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
