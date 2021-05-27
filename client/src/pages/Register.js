import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
// import { Routes } from "../../routes";
import BgImage from "../assets/img/illustrations/signin.svg";
import { Component } from "react";
import { APP_URL } from "./../environment";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: null,
      email: null,
      isLoggedIn: false,
      alert_message: "",
      usernameValid: false,
      emailValid: false,
      emailError: "",
      passwordValid: false,
      checkValue: "student",
      teacherCheck: false,
      studentCheck: true,
    };
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
      this.setState({ isLoggedIn: true });
    }
    // this.renderRedirect();
  }

  validation = () => {
    if (this.state.username) {
      this.setState({
        usernameValid: false,
      });
    } else {
      this.setState({
        usernameValid: true,
      });
      return false;
    }
    if (this.state.email) {
      this.setState({
        emailValid: false,
      });
    } else {
      this.setState({
        emailValid: true,
        emailError: "Choose a valid email",
      });
      return false;
    }
    if (this.state.password) {
      this.setState({
        passwordValid: false,
      });
    } else {
      this.setState({
        passwordValid: true,
      });
      return false;
    }
    return true;
  };

  handleSubmit = async (event) => {
    // console.log(this.state.checkValue);
    event.preventDefault();
    if (!this.validation()) {
      return;
    }
    const creadentials = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      usertype: this.state.checkValue,
    };
    try {
      const resp = await axios.post(`${APP_URL}/api/auth/signup`, creadentials);
      if (resp.data.status) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("@token", resp.data.accessToken);
        localStorage.setItem("@username", resp.data.username);
        localStorage.setItem("@usertype", resp.data.usertype);

        localStorage.setItem("@user_data", JSON.stringify(resp.data));

        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ show_alert: true, alert_message: resp.data.message });
      }
    } catch (err) {
      // Handle Error Here
      console.error(err.massage);
    }
  };
  renderRedirect = () => {
    if (this.state.isLoggedIn) {
      return <Redirect to="/" />;
    }
  };
  render() {
    return (
      <main>
        {this.renderRedirect()}
        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <Row
              className="justify-content-center form-bg-image"
              style={{ backgroundImage: `url(${BgImage})` }}
            >
              <Col
                xs={12}
                className="d-flex align-items-center justify-content-center"
              >
                <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Create an account</h3>
                  </div>
                  <Form className="mt-4" onSubmit={this.handleSubmit}>
                    <Form.Group id="username" className="mb-4">
                      <Form.Label>Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          autoFocus
                          type="text"
                          placeholder="Enter Your Full Name"
                          value={this.state.username}
                          onChange={(e) => {
                            this.setState({ username: e.target.value });
                          }}
                          isInvalid={this.state.usernameValid}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please choose a username.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Your Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          autoFocus
                          type="email"
                          placeholder="example@company.com"
                          value={this.state.email}
                          onChange={(e) => {
                            this.setState({ email: e.target.value });
                          }}
                          isInvalid={this.state.emailValid}
                        />
                        <Form.Control.Feedback type="invalid">
                          {this.state.emailError}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={(e) => {
                            this.setState({ password: e.target.value });
                          }}
                          isInvalid={this.state.passwordValid}
                        />
                        <Form.Control.Feedback type="invalid">
                          Choose a password
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    {/* <Form.Group id="confirmPassword" className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Confirm Password"
                        />
                      </InputGroup>
                    </Form.Group> */}
                    <div className="d-flex justify-content-around align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input
                          id="defaultCheck5"
                          className="me-2"
                          checked={this.state.studentCheck}
                          onChange={(e) => {
                            if (this.state.checkValue === "teacher") {
                              this.setState({
                                checkValue: "student",
                                studentCheck: true,
                                teacherCheck: false,
                              });
                              console.log(
                                this.state.studentCheck,
                                this.state.teacherCheck
                              );
                            }
                          }}
                        />
                        <FormCheck.Label
                          htmlFor="defaultCheck5"
                          className="mb-0"
                        >
                          Student
                        </FormCheck.Label>
                      </Form.Check>
                      <Form.Check type="checkbox">
                        <FormCheck.Input
                          id="defaultCheck5fad"
                          className="me-2"
                          checked={this.state.teacherCheck}
                          onChange={(e) => {
                            if (this.state.checkValue === "student") {
                              this.setState({
                                checkValue: "teacher",
                                studentCheck: false,
                                teacherCheck: true,
                              });
                              console.log(
                                this.state.studentCheck,
                                this.state.teacherCheck
                              );
                            }
                          }}
                        />
                        <FormCheck.Label
                          htmlFor="defaultCheck5fdas"
                          className="mb-0"
                        >
                          Teacher
                        </FormCheck.Label>
                      </Form.Check>
                    </div>

                    <Button variant="primary" type="submit" className="w-100">
                      Sign up
                    </Button>
                  </Form>

                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="fw-normal">
                      Already have an account?
                      <Card.Link as={Link} to={"/login"} className="fw-bold">
                        {` Login here `}
                      </Card.Link>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  }
}

export default Register;
