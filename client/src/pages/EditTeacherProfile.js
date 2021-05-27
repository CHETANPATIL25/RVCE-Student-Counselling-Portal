import React, { Component } from "react";
import { Form } from "@themesberg/react-bootstrap";
import { APP_URL } from "../environment";
import axios from "axios";
import { Button } from "@themesberg/react-bootstrap";

export class EditTeacherProfile extends Component {
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
  async UpdateTeacherProfile() {
    try {
      const resp = await axios.post(
        `${APP_URL}/api/teacher/save`,
        {
          username: this.state.username,
          email: this.state.email,
          mobile_number: this.state.mobile_number,
          designation: this.state.designation,
          address: this.state.address,
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
        this.props.userData.history.push("/teacherprofile");
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
          onClick={this.UpdateTeacherProfile.bind(this)}
        >
          Save
        </Button>
        <div class="card my-3 p-4">
          <div class="card-body">
            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
              Teacher Profile Details
            </h6>

            <div class="row">
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Name</p>
                <Form.Control
                  type="text"
                  placeholder="Enter Your name"
                  value={this.state.username}
                  onChange={(e) => {
                    this.setState({
                      username: e.target.value,
                    });
                  }}
                />

                {/* <h6 class="text-muted f-w-400">{this.state.designation}</h6> */}
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Designation</p>
                <Form.Control
                  type="text"
                  placeholder="Enter Your designation"
                  value={this.state.designation}
                  onChange={(e) => {
                    this.setState({
                      designation: e.target.value,
                    });
                  }}
                />

                {/* <h6 class="text-muted f-w-400">{this.state.mobile_number}</h6> */}
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Phone Number</p>
                <Form.Control
                  type="text"
                  placeholder="Enter Your mobile_number"
                  value={this.state.mobile_number}
                  onChange={(e) => {
                    this.setState({
                      mobile_number: e.target.value,
                    });
                  }}
                />
                <p class="m-b-10 f-w-600">Mail Id</p>
                <Form.Control
                  type="text"
                  placeholder="Enter Your mobile_number"
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({
                      email: e.target.value,
                    });
                  }}
                />
                {/* <h6 class="text-muted f-w-400">{this.state.email}</h6> */}
              </div>
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Address for Comminication</p>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Enter Your Parmanent Address"
                  value={this.state.address}
                  onChange={(e) => {
                    this.setState({
                      address: e.target.value,
                    });
                  }}
                />
                {/* <h6 class="text-muted f-w-400">{this.state.address}</h6> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTeacherProfile;
