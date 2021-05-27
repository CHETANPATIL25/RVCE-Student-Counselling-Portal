import React, { Component } from "react";
import { Table } from "@themesberg/react-bootstrap";
import { Button } from "@themesberg/react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { Nav, Row, Col } from "@themesberg/react-bootstrap";
import ShowSemesterDetails from "./ShowSemesterDetails";
import axios from "axios";
import { APP_URL } from "../environment";
export class Semester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester_list: [],
      current_semester: null,
      current_semester_data: {
        usn: "",
        year_of_registration: "",
        current_semester_int: 0,
        current_semester_str: "",
        registrationDetails: [],
        previous_semester_result: [],
        backlog_details: [],
        internship_details: {
          company_name: "",
          address: "",
          designation: "",
          intership: "",
          salary_package: "",
          designation: "",
        },
      },

      current_semester_number: null,
    };
  }

  async componentDidMount() {
    try {
      const resp = await axios.post(
        `${APP_URL}/api/semester/student-semester-list`,
        {
          email: this.props.current_student_user,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("@token"),
          },
        }
      );
      if (resp.data.status) {
        this.setState({
          semester_list: resp.data.data,
        });
      }
    } catch (error) {}
  }

  async fetchSemester(semester_id) {
    try {
      const resp = await axios.post(
        `${APP_URL}/api/semester/get`,
        {
          id: semester_id,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("@token"),
          },
        }
      );
      if (resp.data.status) {
        console.log("resp from server", resp.data);
        this.setState({
          current_semester_data: { ...resp.data.data },
        });
      }
    } catch (error) {}
  }

  render() {
    return (
      <div>
        {this.props.showAdd ? (
          <Link
            extact
            to={{
              pathname: "/editsemesterdetails",
              query: {
                current_semester_number: this.state.current_semester_number,
                current_semester: this.state.current_semester,
              },
            }}
          >
            <Button
              variant="gray"
              className="m-1"
              style={{
                position: "fixed",
                bottom: "10px",
                right: "10px",
                zIndex: "1",
              }}
            >
              Add Semester Details
            </Button>
          </Link>
        ) : null}

        <Nav
          fill
          defaultActiveKey="home"
          variant="pills"
          className="flex-column flex-sm-row"
        >
          <Nav.Item>
            <Nav.Link
              eventKey="First"
              href="#"
              className="mb-sm-3 mb-md-0"
              onClick={() => {
                if (this.state.semester_list.length > 0) {
                  this.setState({
                    current_semester: this.state.semester_list[0],
                  });
                  this.fetchSemester(this.state.semester_list[0].id);
                } else {
                  this.setState({
                    current_semester_number: 1,
                    current_semester: null,
                  });
                }
              }}
            >
              First Semester
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="Second"
              href="#"
              className="mb-sm-3 mb-md-0"
              onClick={() => {
                if (this.state.semester_list.length > 1) {
                  this.setState({
                    current_semester: this.state.semester_list[1],
                  });
                  this.fetchSemester(this.state.semester_list[1].id);
                } else {
                  this.setState({
                    current_semester_number: 1,
                    current_semester: null,
                  });
                }
              }}
            >
              Second Semester
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="Third"
              href="#"
              className="mb-sm-3 mb-md-0"
              onClick={() => {
                if (this.state.semester_list.length > 2) {
                  this.setState({
                    current_semester: this.state.semester_list[2],
                  });
                  this.fetchSemester(this.state.semester_list[2].id);
                } else {
                  this.setState({
                    current_semester_number: 2,
                    current_semester: null,
                  });
                }
              }}
            >
              Third Semester
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="Fourth"
              href="#"
              className="mb-sm-3 mb-md-0"
              onClick={() => {
                if (this.state.semester_list.length > 3) {
                  this.setState({
                    current_semester: this.state.semester_list[3],
                  });
                  this.fetchSemester(this.state.semester_list[3].id);
                } else {
                  this.setState({
                    current_semester_number: 3,
                    current_semester: null,
                  });
                }
              }}
            >
              Fourth Semester
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              eventKey="Fifth"
              href="#"
              className="mb-sm-3 mb-md-0"
              onClick={() => {
                if (this.state.semester_list.length > 4) {
                  this.setState({
                    current_semester: this.state.semester_list[4],
                  });
                  this.fetchSemester(this.state.semester_list[4].id);
                } else {
                  this.setState({
                    current_semester_number: 4,
                    current_semester: null,
                  });
                }
              }}
            >
              Fifth Semester
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="Sixth"
              href="#"
              className="mb-sm-3 mb-md-0"
              onClick={() => {
                if (this.state.semester_list.length > 5) {
                  this.setState({
                    current_semester: this.state.semester_list[5],
                  });
                  this.fetchSemester(this.state.semester_list[5].id);
                } else {
                  this.setState({
                    current_semester_number: 5,
                    current_semester: null,
                  });
                }
              }}
            >
              Sixth Semester
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {this.state.current_semester ? (
          <ShowSemesterDetails data={this.state.current_semester_data} />
        ) : (
          <div>NO DATA AVAILABLE</div>
        )}
      </div>
    );
  }
}

export default Semester;
