import axios from "axios";
import React, { Component } from "react";
import { APP_URL } from "../environment";
import { Link, Redirect } from "react-router-dom";
import { Button } from "@themesberg/react-bootstrap";

class TeacherProfile extends Component {
  state = {
    username: "",
    email: "",
    profile_pic_url: "",
    mobile_number: "",
    designation: "",
    address: "",
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
        this.setState({
          ...resp.data.data,
        });
      }
    } catch (error) {}
  }
  render() {
    return (
      <div>
        <Link
          extact
          to={{ pathname: "/editTeacherProfile", query: { ...this.state } }}
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
        <div class="card my-3 p-4">
          <div class="card-body">
            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
              Teacher Profile Details
            </h6>
            <p class="m-b-10 f-w-600">Name</p>
            <h6 class="text-muted f-w-400">{this.state.username}</h6>
            <div class="row">
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Designation</p>
                <h6 class="text-muted f-w-400">{this.state.designation}</h6>
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Phone Number</p>
                <h6 class="text-muted f-w-400">{this.state.mobile_number}</h6>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Mail Id</p>
                <h6 class="text-muted f-w-400">{this.state.email}</h6>
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Address for Comminication</p>
                <h6 class="text-muted f-w-400">{this.state.address}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherProfile;
