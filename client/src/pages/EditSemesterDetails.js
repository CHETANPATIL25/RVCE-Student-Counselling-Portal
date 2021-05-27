import React, { Component } from "react";
import { Table } from "@themesberg/react-bootstrap";
import { Button } from "@themesberg/react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { APP_URL } from "../environment";
import { Form } from "@themesberg/react-bootstrap";

export class EditSemesterDetails extends Component {
  state = {
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
  };

  async componentDidMount() {
    if (this.props.userData.history.location.query.current_semester) {
      try {
        const resp = await axios.post(
          `${APP_URL}/api/semester/get`,
          {
            id: this.props.userData.history.location.query.current_semester.id,
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("@token"),
            },
          }
        );
        console.log(resp.data);
        if (resp.data.status) {
          this.setState({
            ...resp.data.data,
          });
        }
      } catch (error) {}
    } else {
    }
  }
  async createSemesterDetails() {
    try {
      const resp = await axios.post(
        `${APP_URL}/api/semester/create`,
        {
          ...this.state,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("@token"),
          },
        }
      );
      console.log(resp.data);
      if (resp.data.status) {
        this.setState({
          ...resp.data.data.added_semester,
        });
        this.props.userData.history.push("/semester");
      }
    } catch (error) {}
  }
  async updateSemesterDetails() {
    try {
      const resp = await axios.post(
        `${APP_URL}/api/semester/update`,
        {
          ...this.state,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("@token"),
          },
        }
      );
      console.log(resp.data);
      this.props.userData.history.push("/semester");
      if (resp.data.status) {
        this.setState({
          ...resp.data.data.added_semester,
        });
      }
    } catch (error) {}
  }

  render() {
    return (
      <div>
        <Button
          variant="gray"
          className="m-1"
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            zIndex: "1",
          }}
          onClick={() => {
            if (this.props.userData.history.location.query.current_semester) {
              this.updateSemesterDetails();
            } else {
              this.createSemesterDetails();
            }
          }}
        >
          Save
        </Button>
        <div class="page-content page-container " id="page-content">
          <div class="">
            <div class="row container d-flex justify-content-center mx-auto my-5">
              <div>
                <div class="card user-card-full">
                  <div class="row m-l-0 m-r-0">
                    <div class="col-sm-12">
                      <div class="card-block">
                        <h6 class="m-b-10  b-b-default f-w-600">Information</h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Name Of Student</p>
                            <Form.Control
                              type="text"
                              placeholder="name@example.com"
                              value={
                                JSON.parse(localStorage.getItem("@user_data"))
                                  .username
                              }
                              // onChange={(e) => {
                              //   this.setState({
                              //     username: e.target.value,
                              //   });
                              // }}
                            />
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">USN</p>
                            <Form.Control
                              type="text"
                              placeholder="Enter Usn"
                              value={this.state.usn}
                              onChange={(e) => {
                                this.setState({
                                  usn: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Year Of Register</p>
                            <Form.Control
                              type="text"
                              placeholder="Enter Year Of Register"
                              value={this.state.year_of_registration}
                              onChange={(e) => {
                                this.setState({
                                  year_of_registration: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Semesterr</p>
                            <Form.Control
                              type="text"
                              placeholder="Enter Current Semester "
                              value={this.state.current_semester_str}
                              onChange={(e) => {
                                this.setState({
                                  current_semester_str: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Details Of Registration
                        </h6>
                        <Table
                          responsive
                          className="table-centered table-nowrap rounded mb-0"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th className="border-0">Course Code</th>
                              <th className="border-0">Course Name </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.registrationDetails.map(
                              (ele, index) => (
                                <tr key={index}>
                                  <td className="text-primary fw-bold">
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Course Code"
                                      value={
                                        this.state.registrationDetails[index]
                                          .course_code
                                      }
                                      onChange={(e) => {
                                        let arr =
                                          this.state.registrationDetails;
                                        arr[index].course_code = e.target.value;
                                        this.setState({
                                          registrationDetails: arr,
                                        });
                                      }}
                                    />
                                  </td>
                                  <td className="">
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Course Name"
                                      value={
                                        this.state.registrationDetails[index]
                                          .course_name
                                      }
                                      onChange={(e) => {
                                        let arr =
                                          this.state.registrationDetails;
                                        arr[index].course_name = e.target.value;
                                        this.setState({
                                          registrationDetails: arr,
                                        });
                                      }}
                                    />
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </Table>{" "}
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                          onClick={() => {
                            let currentPosition = [
                              "first",
                              "second",
                              "third",
                              "fourth",
                              "fifth",
                              "sixth",
                            ];
                            let arr = this.state.registrationDetails;
                            arr.push({
                              course_code: "",
                              course_name: "",
                            });
                            this.setState({
                              registrationDetails: arr,
                            });
                          }}
                        >
                          Add
                        </Button>
                        {/* previous semester details */}
                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Previous Semester Details
                        </h6>
                        <Table
                          responsive
                          className="table-centered table-nowrap rounded mb-0"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th className="border-0">Semester</th>
                              <th className="border-0">sgpa</th>
                              <th className="border-0">cgpa</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.previous_semester_result.map(
                              (ele, index) => (
                                <tr key={index}>
                                  <td className="text-primary fw-bold">
                                    {ele.semester}
                                  </td>

                                  <td className="text-primary fw-bold">
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter sgpa"
                                      value={
                                        this.state.previous_semester_result[
                                          index
                                        ].sgpa
                                      }
                                      onChange={(e) => {
                                        let arr =
                                          this.state.previous_semester_result;
                                        arr[index].sgpa = e.target.value;
                                        this.setState({
                                          registrationDetails: arr,
                                        });
                                      }}
                                    />
                                  </td>
                                  <td className="">
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter cgpa"
                                      value={
                                        this.state.previous_semester_result[
                                          index
                                        ].cgpa
                                      }
                                      onChange={(e) => {
                                        let arr =
                                          this.state.previous_semester_result;
                                        arr[index].cgpa = e.target.value;
                                        this.setState({
                                          registrationDetails: arr,
                                        });
                                      }}
                                    />
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </Table>{" "}
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                          onClick={() => {
                            let currentPosition = [
                              "first",
                              "second",
                              "third",
                              "fourth",
                              "fifth",
                              "sixth",
                            ];

                            if (
                              this.state.previous_semester_result.length < 6
                            ) {
                              let arr = this.state.previous_semester_result;
                              arr.push({
                                semester:
                                  currentPosition[
                                    this.state.previous_semester_result.length
                                  ],
                                sgpa: "",
                                cgpa: "",
                              });
                              this.setState({
                                previous_semester_result: arr,
                              });
                            }
                          }}
                        >
                          Add
                        </Button>
                        {/* previous semester details */}
                        {/* Backlog Details */}
                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Backlog Details
                        </h6>
                        <Table
                          responsive
                          className="table-centered table-nowrap rounded mb-0"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th className="border-0">semester</th>
                              <th className="border-0">course code</th>
                              <th className="border-0">course name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.backlog_details.map((ele, index) => (
                              <tr key={index}>
                                <td className="text-primary fw-bold">
                                  {ele.semester}
                                </td>

                                <td className="text-primary fw-bold">
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Course Code"
                                    value={
                                      this.state.backlog_details[index]
                                        .course_code
                                    }
                                    onChange={(e) => {
                                      let arr = this.state.backlog_details;
                                      arr[index].course_code = e.target.value;
                                      this.setState({
                                        registrationDetails: arr,
                                      });
                                    }}
                                  />
                                </td>
                                <td className="">
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Course Name"
                                    value={
                                      this.state.backlog_details[index]
                                        .course_name
                                    }
                                    onChange={(e) => {
                                      let arr = this.state.backlog_details;
                                      arr[index].course_name = e.target.value;
                                      this.setState({
                                        backlog_details: arr,
                                      });
                                    }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>{" "}
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-1"
                          onClick={() => {
                            let currentPosition = [
                              "first",
                              "second",
                              "third",
                              "fourth",
                              "fifth",
                              "sixth",
                            ];

                            // if (
                            //   this.state.previous_semester_result.length < 6
                            // ) {
                            let arr = this.state.backlog_details;
                            arr.push({
                              semester:
                                currentPosition[
                                  this.state.backlog_details.length
                                ],
                              course_code: "",
                              course_name: "",
                            });
                            this.setState({
                              registrationDetails: arr,
                            });
                            // }
                          }}
                        >
                          Add
                        </Button>
                        {/* Backlog Details end*/}
                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Details of Internship/ Project / Placement
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Name Of The Company</p>
                            <Form.Control
                              type="text"
                              placeholder="Enter company_name"
                              value={this.state.internship_details.company_name}
                              onChange={(e) => {
                                let objIntern = this.state.internship_details;
                                objIntern.company_name = e.target.value;
                                this.setState({
                                  internship_details: { ...objIntern },
                                });
                              }}
                            />
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Address</p>
                            <h6 class="text-muted f-w-400">
                              <Form.Control
                                type="text"
                                placeholder="Enter address"
                                value={this.state.internship_details.address}
                                onChange={(e) => {
                                  let objIntern = this.state.internship_details;
                                  objIntern.address = e.target.value;
                                  this.setState({
                                    internship_details: { ...objIntern },
                                  });
                                }}
                              />
                            </h6>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Designation</p>
                            <Form.Control
                              type="text"
                              placeholder="Enter designation"
                              value={this.state.internship_details.designation}
                              onChange={(e) => {
                                let objIntern = this.state.internship_details;
                                objIntern.designation = e.target.value;
                                this.setState({
                                  internship_details: { ...objIntern },
                                });
                              }}
                            />
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Intership</p>
                            <Form.Control
                              type="text"
                              placeholder="Enter Course intership"
                              value={this.state.internship_details.intership}
                              onChange={(e) => {
                                let objIntern = this.state.internship_details;
                                objIntern.intership = e.target.value;
                                this.setState({
                                  internship_details: { ...objIntern },
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Salary Package</p>
                            <Form.Control
                              type="text"
                              placeholder="Enter salary_package"
                              value={
                                this.state.internship_details.salary_package
                              }
                              onChange={(e) => {
                                let objIntern = this.state.internship_details;
                                objIntern.salary_package = e.target.value;
                                this.setState({
                                  internship_details: { ...objIntern },
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditSemesterDetails;
