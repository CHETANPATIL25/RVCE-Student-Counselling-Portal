const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Logout = db.logout;
const Teacher = require("../models/teacherDetails");
// const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { Student } = require("../models");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    usertype: req.body.usertype,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, role) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (role.usertype == "student") {
      const student = new Student({
        username: req.body.username,
        email: req.body.email,
        profile_pic_url: "",
        mobile_number: "",
        category: "",
        permanentAddress: "",
        presentAddress: "",
        permanentAddressPinCode: 0,
        presentAddressPinCode: 0,
        father_name: "",
        mother_name: "",
        local_guardian_name: "",
        father_occupation: "",
        mother_occupation: "",
        local_guardian_occupation: "",
        father_email: "",
        mother_email: "",
        local_guardian_emial: "",
        father_phone_no: "",
        mother_phone_no: "",
        local_guardian_phone_no: "",
        parent_office_address: "",
        person_to_be_contacted_in_emergency: "",
        rank: "",
        rank_percentile: "",
        counsellorlist: [],
        semesterlist: [],
      });
      student.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        User.findOne({ email: req.body.email }, (err, role1) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          var token = jwt.sign(
            { id: user.id, email: req.body.email, username: req.body.username },
            config.secret,
            {
              expiresIn: 86400, // 24 hours
            }
          );

          res.status(200).send({
            status: true,
            id: role._id,
            username: role.username,
            email: role.email,
            accessToken: token,
            usertype: role.usertype,
          });
        });
      });
    } else if (role.usertype === "teacher") {
      const teacher = new Teacher({
        username: req.body.username,
        email: req.body.email,
        profile_pic_url: "",
        mobile_number: "",
        designation: "",
        address: "",
        studentlist: [],
      });
      teacher.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        Teacher.findOne({ email: req.body.email }, (err, role1) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          var token = jwt.sign(
            { id: user.id, email: req.body.email, username: req.body.username },
            config.secret,
            {
              expiresIn: 86400, // 24 hours
            }
          );

          res.status(200).send({
            status: true,
            id: role._id,
            username: role.username,
            email: role.email,
            accessToken: token,
            usertype: role.usertype,
          });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(200).send({
          status: false,
          message: "Email Not found.",
          errType: "email",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(200).send({
          accessToken: null,
          message: "Invalid Password!",
          errType: "password",
          status: false,
        });
      }

      var token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        config.secret,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      var authorities = [];

      res.status(200).send({
        status: true,
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
        usertype: user.usertype,
      });
    });
};

exports.logout = (req, res) => {
  const logout_user = new Logout({
    accessToken: req.body.accessToken,
  });
  logout_user.save((err, doc) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      status: true,
      masssage: "logout",
      accessToken: null,
    });
  });
};
