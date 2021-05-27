const jwt_decode = require("jwt-decode");
const Student = require("../models/studentDetails");
const TeacherDetails = require("../models/teacherDetails");

exports.fetchAllDetails = (req, res) => {
  let header = req.headers["x-access-token"];
  var decoded = jwt_decode(header);

  Student.findOne(
    {
      email: decoded.email,
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

exports.SaveUserDetails = (req, res) => {
  let header = req.headers["x-access-token"];
  var decoded = jwt_decode(header);
  Student.findOneAndUpdate(
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

exports.addCounsoller = (req, res) => {
  let header = req.headers["x-access-token"];
  var decoded = jwt_decode(header);

  Student.findOne({ email: decoded.email }, (err, role) => {
    for (var i = 0; i < role.counsellorlist.length; i++) {
      if (req.body.email === role.counsellorlist[i].email) {
        res.status(200).send({
          status: false,
          message: "email is already added",
          data: null,
        });
        return;
      }
    }
    role.counsellorlist.push({ ...req.body });
    role.save();

    TeacherDetails.findOne({ email: req.body.email }, (err, role1) => {
      role1.studentlist.push({
        email: decoded.email,
        id: role._id,
      });
      role1.save();
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send({
        status: true,
        data: role1,
      });
    });
  });
};

exports.fetchLimitedStudent = async (req, res) => {
  Student.find({ email: req.body.email }, (err, role) => {
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
