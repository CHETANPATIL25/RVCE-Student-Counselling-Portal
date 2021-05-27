import React, { Component } from "react";
import { Table } from "@themesberg/react-bootstrap";
import { Form } from "@themesberg/react-bootstrap";
import { Button } from "@themesberg/react-bootstrap";
import axios from "axios";
import { APP_URL } from "./../environment";
import { Link, Redirect } from "react-router-dom";

export class EditStudentProfile extends Component {
  state = {
    category: "",
    blood_group: "",
    father_email: "",
    father_name: "",
    father_occupation: "",
    gender: "",
    pan_number: "",
    adhaar_number: "",
    father_phone_no: "",
    local_guardian_emial: "",
    local_guardian_name: "",
    local_guardian_occupation: "",
    local_guardian_phone_no: "",
    mobile_number: "",
    mother_email: "",
    mother_name: "",
    mother_occupation: "",
    mother_phone_no: "",
    parent_office_address: "",
    permanentAddress: "",
    permanentAddressPinCode: 0,
    person_to_be_contacted_in_emergency: "",
    presentAddress: "",
    presentAddressPinCode: 0,
    profile_pic_url: "",
    rank: "",
    rank_percentile: "",
    username: "",
  };
  async componentDidMount() {
    // this.setState({
    //   ...this.props.userData,
    // });
    // // console.log(this.props.userData);
    // get user data
    try {
      const resp = await axios.get(`${APP_URL}/api/student/getall`, {
        headers: {
          "x-access-token": localStorage.getItem("@token"),
        },
      });

      if (resp.data.status) {
        this.setState({
          ...resp.data.data,
        });
      } else {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("@token");
        localStorage.removeItem("@username");
        localStorage.removeItem("@user_data");
        this.setState({ isLoggedIn: false });
      }
    } catch (error) {
      console.error(error.massage);
    }
  }
  async UpateUser() {
    try {
      const resp = await axios.post(
        `${APP_URL}/api/student/save`,
        {
          ...this.state,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("@token"),
          },
        }
      );

      if (resp.data.status) {
        // this.setState({
        //   ...resp.data.data,
        // });
        console.log(this.props.userData.history.push("/profile"));
      }
    } catch (error) {
      console.error(error.massage);
    }
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
          onClick={this.UpateUser.bind(this)}
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
                        <div class="row">
                          <div class="col-sm-4">
                            <div class="card-block text-center text-white">
                              <div class="m-b-25">
                                <img
                                  src="https://img.icons8.com/bubbles/100/000000/user.png"
                                  class="img-radius"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-sm-8">
                            <div className="my-3">
                              <p class="m-b-10 f-w-600">Name</p>
                              <Form.Control
                                type="text"
                                placeholder="name@example.com"
                                value={this.state.username}
                                onChange={(e) => {
                                  this.setState({
                                    username: e.target.value,
                                  });
                                }}
                              />
                              <p class="m-b-10 f-w-600">Email</p>
                              <Form.Control
                                disabled
                                type="email"
                                placeholder="name@example.com"
                                value={this.state.email}
                                // onChange={(e) => {
                                //   this.setState({
                                //     email: e.target.value,
                                //   });
                                // }}
                              />
                            </div>
                          </div>
                        </div>
                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                          Information
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Blood Group</p>
                            <Form.Control
                              type="text"
                              placeholder="Enter Your Blood Group"
                              value={this.state.blood_group}
                              onChange={(e) => {
                                this.setState({
                                  blood_group: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Phone</p>
                            <Form.Control
                              type="email"
                              placeholder="Enter Your Phone Number"
                              value={this.state.mobile_number}
                              onChange={(e) => {
                                this.setState({
                                  mobile_number: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Gender</p>
                            <Form.Select
                              value={this.state.gender}
                              onChange={(e) => {
                                this.setState({
                                  gender: e.target.value,
                                });
                              }}
                            >
                              <option defaultValue>Select Gender</option>
                              <option>Male</option>
                              <option>Female</option>
                            </Form.Select>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Catogery</p>
                            <Form.Control
                              type="text"
                              placeholder="Enter Your Catogery"
                              value={this.state.category}
                              onChange={(e) => {
                                this.setState({
                                  category: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Adhaar Number</p>
                            <Form.Control
                              type="text"
                              placeholder="Enter Your Adhaar Number"
                              value={this.state.adhaar_number}
                              onChange={(e) => {
                                this.setState({
                                  adhaar_number: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">PAN Number</p>
                            <Form.Control
                              type="text"
                              placeholder="Enter Your PAN Number"
                              value={this.state.pan_number}
                              onChange={(e) => {
                                this.setState({
                                  pan_number: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>

                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Address
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Parmanent Address</p>
                            <Form.Control
                              as="textarea"
                              rows="3"
                              placeholder="Enter Your Parmanent Address"
                              value={this.state.permanentAddress}
                              onChange={(e) => {
                                this.setState({
                                  permanentAddress: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Present Address</p>
                            <h6 class="text-muted f-w-400">
                              <Form.Control
                                as="textarea"
                                rows="3"
                                placeholder="Enter Your Present Address"
                                value={this.state.presentAddress}
                                onChange={(e) => {
                                  this.setState({
                                    presentAddress: e.target.value,
                                  });
                                }}
                              />
                            </h6>
                          </div>
                        </div>
                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Details Of Parent And Guardians
                        </h6>

                        <Table
                          responsive
                          className="table-centered table-nowrap rounded mb-0"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th className="border-0">Parent</th>
                              <th className="border-0">Father </th>
                              <th className="border-0">Mother </th>
                              <th className="border-0">Guardians </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-primary fw-bold">Name</td>

                              <td className="">
                                <Form.Control
                                  type="text"
                                  placeholder="Father Name"
                                  value={this.state.father_name}
                                  onChange={(e) => {
                                    this.setState({
                                      father_name: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                              <td className="">
                                <Form.Control
                                  type="text"
                                  placeholder="Mother Name"
                                  value={this.state.mother_name}
                                  onChange={(e) => {
                                    this.setState({
                                      mother_name: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                              <td className="">
                                <Form.Control
                                  type="text"
                                  placeholder="Guardian Name"
                                  value={this.state.local_guardian_name}
                                  onChange={(e) => {
                                    this.setState({
                                      local_guardian_name: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="text-primary fw-bold">
                                Occupation
                              </td>

                              <td className="">
                                <Form.Control
                                  type="text"
                                  placeholder="Father Occupation"
                                  value={this.state.father_occupation}
                                  onChange={(e) => {
                                    this.setState({
                                      father_occupation: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                              <td className="">
                                <Form.Control
                                  type="text"
                                  placeholder="Mother Occupation"
                                  value={this.state.mother_occupation}
                                  onChange={(e) => {
                                    this.setState({
                                      mother_occupation: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                              <td className="">
                                <Form.Control
                                  type="text"
                                  placeholder="Guardian Occupation"
                                  value={this.state.local_guardian_occupation}
                                  onChange={(e) => {
                                    this.setState({
                                      local_guardian_occupation: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="text-primary fw-bold">Email Id</td>
                              <td className="">
                                <Form.Control
                                  type="email"
                                  placeholder="Father Email"
                                  value={this.state.father_email}
                                  onChange={(e) => {
                                    this.setState({
                                      father_email: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                              <td className="">
                                <Form.Control
                                  type="email"
                                  placeholder="Mother Email"
                                  value={this.state.mother_email}
                                  onChange={(e) => {
                                    this.setState({
                                      mother_email: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                              <td className="">
                                <Form.Control
                                  type="email"
                                  placeholder="Guardian Email"
                                  value={this.state.local_guardian_emial}
                                  onChange={(e) => {
                                    this.setState({
                                      local_guardian_emial: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="text-primary fw-bold">
                                Phone Number
                              </td>
                              <td className="">
                                <Form.Control
                                  type="number"
                                  placeholder="Father Number"
                                  value={this.state.father_phone_no}
                                  onChange={(e) => {
                                    this.setState({
                                      father_phone_no: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                              <td className="">
                                <Form.Control
                                  type="number"
                                  placeholder="Mother Number"
                                  value={this.state.mother_phone_no}
                                  onChange={(e) => {
                                    this.setState({
                                      mother_phone_no: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                              <td className="">
                                <Form.Control
                                  type="number"
                                  placeholder="Guardian Number"
                                  value={this.state.local_guardian_phone_no}
                                  onChange={(e) => {
                                    this.setState({
                                      local_guardian_phone_no: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Office Address
                        </h6>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          placeholder="Office Address"
                          value={this.state.parent_office_address}
                          onChange={(e) => {
                            this.setState({
                              parent_office_address: e.target.value,
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
    );
  }
}

export default EditStudentProfile;
