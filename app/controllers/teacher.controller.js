const jwt_decode = require("jwt-decode");
const Teacher = require("../models/teacherDetails");
const Student = require("../models/studentDetails");
exports.fetchTeacherList = (req, res) => {
  Teacher.find((err, role) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      status: true,
      data: role,
    });
  });
};

exports.fetchLimitedTeacher = async (req, res) => {
  Teacher.find({ email: req.body.email }, (err, role) => {
    if (err) {
      res.status(200).send({ status: false, message: err });
      return;
    }
    res.status(200).send({
      status: true,
      data: role,
    });
  });
};

exports.fetchTeacherData = (req, res) => {
  let header = req.headers["x-access-token"];
  var decoded = jwt_decode(header);
  Teacher.findOne({ email: decoded.email }, (err, role) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      status: true,
      data: role,
    });
  });
};

exports.SaveUserDetails = (req, res) => {
  let header = req.headers["x-access-token"];
  var decoded = jwt_decode(header);
  Teacher.findOneAndUpdate(
    {
      email: decoded.email,
    },
    { ...req.body },
    (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        status: true,
        data: role,
      });
    }
  );
};

exports.fetchStudentWholeDetails = (req, res) => {
  Student.findOne(
    {
      email: req.body.email,
    },
    (err, role) => {
      if (err) {
        res.status(200).send({
          message: err,
        });
        return;
      }
      console.log(role);
      res.status(200).send({
        status: true,
        data: role,
      });
    }
  );
};
