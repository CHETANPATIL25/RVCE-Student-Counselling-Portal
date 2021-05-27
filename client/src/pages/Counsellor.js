import React, { Component } from "react";
import { Button, Modal, Form } from "@themesberg/react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { APP_URL } from "./../environment";
export class Counsellor extends Component {
  state = {
    ModalShow: false,
    studentCounList: [],
    allCounList: [],
    selectedCoun: "",
  };

  fetchStudentCounList = async () => {
    // get user data
    try {
      const resp = await axios.get(`${APP_URL}/api/student/getall`, {
        headers: {
          "x-access-token": localStorage.getItem("@token"),
        },
      });

      if (resp.data.status) {
        let arr = [];
        console.log(resp.data.data.counsellorlist);
        resp.data.data.counsellorlist.forEach((ele, index) => {
          arr.push(ele.email);
        });

        try {
          const resp2 = await axios.post(
            `${APP_URL}/api/teacher/getbyid`,
            {
              email: arr,
            },
            {
              headers: {
                "x-access-token": localStorage.getItem("@token"),
              },
            }
          );

          if (resp2.data.status) {
            this.setState({
              studentCounList: resp2.data.data,
            });
          }
        } catch (e) {}
      } else {
        // localStorage.removeItem("isLoggedIn");
        // localStorage.removeItem("@token");
        // localStorage.removeItem("@username");
        // localStorage.removeItem("@user_data");
        // this.setState({ isLoggedIn: false });
      }
    } catch (error) {
      console.error(error.massage);
    }
  };

  fetchAllCounsellorList = async () => {
    try {
      const resp = await axios.get(`${APP_URL}/api/teacher/getall`, {
        headers: {
          "x-access-token": localStorage.getItem("@token"),
        },
      });

      if (resp.data.status) {
        this.setState({
          allCounList: [...resp.data.data],
        });
      } else {
        // localStorage.removeItem("isLoggedIn");
        // localStorage.removeItem("@token");
        // localStorage.removeItem("@username");
        // localStorage.removeItem("@user_data");
        // this.setState({ isLoggedIn: false });
      }
    } catch (error) {
      console.error(error.massage);
    }
  };
  async componentDidMount() {
    await this.fetchStudentCounList();
    await this.fetchAllCounsellorList();
  }

  ModalhandleClose = () => {
    this.setState({
      ModalShow: false,
    });
  };
  AddCounsellor = async () => {
    try {
      const resp = await axios.post(
        `${APP_URL}/api/student/add-counsoller`,
        { email: this.state.selectedCoun },
        {
          headers: {
            "x-access-token": localStorage.getItem("@token"),
          },
        }
      );
      let arr = this.state.studentCounList;
      arr.push(resp.data.data);
      if (resp.data.status) {
        this.setState({
          studentCounList: arr,
          ModalShow: false,
        });
      } else {
        this.setState({ ModalShow: false });
        // localStorage.removeItem("isLoggedIn");
        // localStorage.removeItem("@token");
        // localStorage.removeItem("@username");
        // localStorage.removeItem("@user_data");
        // this.setState({ isLoggedIn: false });
      }
    } catch (error) {
      console.error(error.massage);
    }
  };
  render() {
    return (
      <div>
        <div className="container">
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
              this.setState({
                ModalShow: true,
              });
            }}
          >
            Add Counseller
          </Button>
          {this.state.studentCounList.map((ele, index) => (
            <div class="card my-3 p-4" key={index}>
              <div class="card-body">
                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">{ele.username}</h6>
                <div class="row">
                  <div class="col-sm-6">
                    <p class="m-b-10 f-w-600">Designation</p>
                    <h6 class="text-muted f-w-400">{ele.designation}</h6>
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
                  <div class="col-sm-6">
                    <p class="m-b-10 f-w-600">Address for Comminication</p>
                    <h6 class="text-muted f-w-400">{ele.address}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <React.Fragment>
          <Modal
            as={Modal.Dialog}
            centered
            show={this.state.ModalShow}
            onHide={this.ModalhandleClose}
          >
            <Modal.Header>
              <Modal.Title className="h6">Add a Counsellor</Modal.Title>
              <Button
                variant="close"
                aria-label="Close"
                onClick={this.ModalhandleClose}
              />
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Select a counsellor</Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      this.setState({
                        selectedCoun: e.target.value,
                      });
                      console.log(e.target.value);
                    }}
                  >
                    {/* <option defaultValue>Open this select menu</option> */}

                    {this.state.allCounList.map((ele, index) => (
                      <option key={index}>{ele.email}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary">I Got It</Button> */}
              <Button
                variant="link"
                className="text-gray ms-auto"
                onClick={() => {
                  if (this.state.selectedCoun) {
                    this.AddCounsellor();
                  }
                }}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}

export default Counsellor;
