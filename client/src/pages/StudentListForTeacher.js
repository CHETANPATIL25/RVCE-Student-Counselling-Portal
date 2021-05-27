import axios from "axios";
import React, { Component } from "react";
import { APP_URL } from "../environment";
import { Image, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import USAFlag from "../assets/img/flags/united-states-of-america.svg";
import CanadaFlag from "../assets/img/flags/canada.svg";
import UKFlag from "../assets/img/flags/united-kingdom.svg";
import FranceFlag from "../assets/img/flags/france.svg";
import JapanFlag from "../assets/img/flags/japan.svg";
import GermanyFlag from "../assets/img/flags/germany.svg";
import { Button } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

export class StudentListForTeacher extends Component {
  state = {
    studentlist: [],
  };

  async componentDidMount() {
    try {
      const resp = await axios.post(`${APP_URL}/api/teacher/data`, null, {
        headers: {
          "x-access-token": localStorage.getItem("@token"),
        },
      });
      console.log(resp.data);
      if (resp.data.status) {
        // this.setState({
        //   studentlist: resp.data.data.studentlist,
        // });
        let arr = [];
        console.log(resp.data.data.studentlist);
        resp.data.data.studentlist.forEach((ele, index) => {
          arr.push(ele.email);
        });
        try {
          const resp2 = await axios.post(
            `${APP_URL}/api/student/getbyid`,
            {
              email: arr,
            },
            {
              headers: {
                "x-access-token": localStorage.getItem("@token"),
              },
            }
          );
          console.log("student api", resp2.data.data);

          if (resp2.data.status) {
            this.setState({
              studentlist: resp2.data.data,
            });
          }
        } catch (e) {}
      }
    } catch (error) {}
  }

  render() {
    return (
      <div>
        {this.state.studentlist.map((ele, index) => (
          <div class="card my-3 p-4" key={index}>
            <div class="card-header d-flex justify-content-end">
              <Link
                to={{
                  pathname: "/studentwholedetails",
                  studentwholedetailsemail: ele.email,
                }}
              >
                <Button>Show Profile</Button>
              </Link>
              <Button
                className="ms-3"
                onClick={() => {
                  localStorage.setItem("@current_student_mail", ele.email);
                  console.log(this.props.userData.history.push("/semester"));
                }}
              >
                Show Semester
              </Button>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-sm-6">
                  <p class="m-b-10 f-w-600">Name</p>
                  <h6 class="text-muted f-w-400">{ele.username}</h6>
                </div>
                <div class="col-sm-6">
                  <p class="m-b-10 f-w-600">Phone Number</p>
                  <h6 class="text-muted f-w-400">{ele.mobile_number}</h6>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <p class="m-b-10 f-w-600">Mail Id</p>
                  <h6 class="text-muted f-w-400">{ele.email}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default StudentListForTeacher;
