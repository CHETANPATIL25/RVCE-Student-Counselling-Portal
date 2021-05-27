import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
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
import BgImage from "../assets/img/illustrations/signin.svg";
import { APP_URL } from "./../environment";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
      show_alert: false,
      alert_message: "",
      usernameValid: false,
      emailValid: false,
      emailError: "",
      passwordValid: false,
      passwordError: "",
      checkValue: "student",
      teacherCheck: false,
      studentCheck: true,
    };
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
      this.setState({ isLoggedIn: true });
    }
  }
  validation = () => {
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
        passwordError: "Choose a password",
      });
      return false;
    }
    return true;
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.validation()) {
      return;
    }
    const creadentials = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      const resp = await axios.post(`${APP_URL}/api/auth/signin`, creadentials);

      if (resp.data.status) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("@token", resp.data.accessToken);
        localStorage.setItem("@username", resp.data.username);
        localStorage.setItem("@user_data", JSON.stringify(resp.data));
        localStorage.setItem("@usertype", resp.data.usertype);
        this.setState({ isLoggedIn: true });
      } else {
        if (resp.data.errType === "email") {
          this.setState({
            emailValid: true,
            emailError: resp.data.message,
          });
        }
        if (resp.data.errType === "password") {
          this.setState({
            passwordValid: true,
            passwordError: resp.data.message,
          });
        }
      }
    } catch (err) {
      // Handle Error Here
      console.error(err.massage);
    }
  };
  renderRedirect = () => {
    if (this.state.isLoggedIn) {
      console.log("user is logged in");
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
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Sign in to our platform</h3>
                  </div>
                  <Form className="mt-4" onSubmit={this.handleSubmit}>
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
                          value={this.state.emaiil}
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
                    <Form.Group>
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
                            {this.state.passwordError}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      {/*  */}
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Sign in
                    </Button>
                  </Form>

                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <span className="fw-normal">
                      Not registered?
                      <Card.Link as={Link} to={"/register"} className="fw-bold">
                        {` Create account `}
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

export default Login;
