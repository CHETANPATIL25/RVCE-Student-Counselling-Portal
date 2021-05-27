const jwt_decode = require("jwt-decode");
const Student = require("../models/studentDetails");
const TeacherDetails = require("../models/teacherDetails");
const Semester = require("../models/semester");

exports.create = (req, res) => {
  let header = req.headers["x-access-token"];
  var decoded = jwt_decode(header);

  Student.findOne(
    {
      email: decoded.email,
    },
    (err, student_role) => {
      if (err) {
        res.status(200).send({
          message: err,
        });
        return;
      }
      const semester = new Semester({
        email: decoded.email,
        username: student_role.username,
        ...req.body,
      });

      semester.save((err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        var arr = ["first", "second", "third", "fourth", "fifth", "sixth"];
        student_role.semesterlist.push({
          id: role._id,
          number: arr[req.body.semester_number - 1],
        });
        student_role.save();
        res.status(200).send({
          status: true,
          data: { studendetailas: student_role, added_semester: role },
        });
      });
    }
  );
};

exports.updateSemester = (req, res) => {
  Semester.findByIdAndUpdate(req.body._id, { ...req.body }, (err, role) => {
    if (err) {
      res.status(200).send({ status: false, message: err.message });
      return;
    }
    res.status(200).send({
      status: true,
      data: role,
    });
  });
};

exports.getSemester = (req, res) => {
  Semester.findById(req.body.id, (err, role) => {
    if (err) {
      res.status(200).send({ status: false, message: err.message });
      return;
    }
    res.status(200).send({
      status: true,
      data: role,
    });
  });
};

exports.getStudentSemesterList = (req, res) => {
  Student.findOne({ email: req.body.email }, (err, role) => {
    if (err) {
      res.status(200).send({ status: false, message: err.message });
      return;
    }
    res.status(200).send({
      status: true,
      data: role.semesterlist,
    });
  });
};
