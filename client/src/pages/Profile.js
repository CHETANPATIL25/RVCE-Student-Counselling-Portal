import React, { Component } from "react";
import { Table } from "@themesberg/react-bootstrap";
import { Button } from "@themesberg/react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { APP_URL } from "./../environment";
class Profile extends Component {
  state = {
    category: "",
    email: "",
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
    isLoggedIn: true,
  };

  async componentDidMount() {
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
  renderRedirect = () => {
    if (!this.state.isLoggedIn) {
      console.log("user is logged in");
      return <Redirect to="/" />;
    }
  };
  render() {
    return (
      <div>
        {this.renderRedirect()}
        {/* to={{ pathname: "/editStudentProfile", query: { the: "query" } }} */}
        <Link
          extact
          to={{ pathname: "/editStudentProfile", query: { ...this.state } }}
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
            Edit Profile
          </Button>
        </Link>
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
                              <h6 class="text-muted f-w-400">
                                {this.state.username}
                              </h6>
                              <p class="m-b-10 f-w-600">Email</p>
                              <h6 class="text-muted f-w-400">
                                {this.state.email}
                              </h6>
                            </div>
                          </div>
                        </div>
                        <h6 class="m-b-10  b-b-default f-w-600">Information</h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Blood Group</p>
                            <h6 class="text-muted f-w-400">
                              {this.state.blood_group}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Phone</p>
                            <h6 class="text-muted f-w-400">
                              {this.state.mobile_number}
                            </h6>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Gender</p>
                            <h6 class="text-muted f-w-400">
                              {this.state.gender}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Catogery</p>
                            <h6 class="text-muted f-w-400">
                              {this.state.category}
                            </h6>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Adhaar Number</p>
                            <h6 class="text-muted f-w-400">
                              {this.state.adhaar_number}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">PAN Number</p>
                            <h6 class="text-muted f-w-400">
                              {this.state.pan_number}
                            </h6>
                          </div>
                        </div>

                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Address
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Parmanent Address</p>
                            <h6 class="text-muted f-w-400">
                              {this.state.presentAddress}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Present Address</p>
                            <h6 class="text-muted f-w-400">
                              {this.state.presentAddress}
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

                              <td className="">{this.state.father_name}</td>
                              <td className="">{this.state.mother_name}</td>
                              <td className="">
                                {this.state.local_guardian_name}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-primary fw-bold">
                                Occupation
                              </td>

                              <td className="">
                                {this.state.father_occupation}
                              </td>
                              <td className="">
                                {this.state.mother_occupation}
                              </td>
                              <td className="">
                                {this.state.local_guardian_occupation}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-primary fw-bold">Email Id</td>
                              <td className="">{this.state.father_email}</td>
                              <td className="">{this.state.mother_email}</td>
                              <td className="">
                                {this.state.local_guardian_emial}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-primary fw-bold">
                                Phone Number
                              </td>
                              <td className="">{this.state.father_phone_no}</td>
                              <td className="">{this.state.mother_phone_no}</td>
                              <td className="">
                                {this.state.local_guardian_phone_no}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Office Address
                        </h6>
                        <h6 class="text-muted f-w-400">
                          {this.state.parent_office_address}
                        </h6>
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

export default Profile;
