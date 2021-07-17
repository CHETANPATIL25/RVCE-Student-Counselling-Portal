import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { APP_URL } from "./../environment";
import {
  Nav,
  Card,
  Navbar,
  Container,
  Button,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  faComments,
  faSun,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import Profile from "./Profile";
import EditStudentProfile from "./EditStudentProfile";
import Semester from "./Semester";
import Counsellor from "./Counsellor";
import Chat from "./components/Main";
import EditSemesterDetails from "./EditSemesterDetails";
// import { Button } from "react-bootstrap";
export class StudentHome extends Component {
  componentDidMount() {
    console.log("data from parernt", this.props.data.history);
  }
  logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("@token");
    localStorage.removeItem("@username");
    localStorage.removeItem("@user_data");
    localStorage.removeItem("@usertype");
    this.props.data.history.push("/login");
  }
  render() {
    return (
      <div>
        <Navbar
          variant="dark"
          expand="lg"
          bg="dark"
          className="navbar-transparent navbar-theme-primary"
        >
          <Container className="position-relative">
            <Navbar.Brand href="#home" className="me-lg-3">
              {/* <Image src={ReactLogo} /> */}
            </Navbar.Brand>

            <Navbar.Collapse
              id="navbar-default-primary justify-content-end"
              className="w-100"
            >
              <Nav className="navbar-nav-hover align-items-lg-center ms-auto">
                <Nav.Item>
                  <Nav.Link
                    eventKey="home"
                    href="#"
                    className="mb-sm-3 mb-md-0"
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    extact
                    to={`/profile`}
                    eventKey="profile"
                    className="mb-sm-3 mb-md-0"
                    style={{
                      color: "white",
                    }}
                  >
                    {/* <Nav.Link
                // href={`${this.props.match.url}profile`}
                eventKey="profile"
                className="mb-sm-3 mb-md-0"
              > */}
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                    Profile
                    {/* </Nav.Link> */}
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    extact
                    to={`/semester`}
                    eventKey="profile"
                    className="mb-sm-3 mb-md-0"
                    style={{
                      color: "white",
                    }}
                  >
                    <FontAwesomeIcon icon={faSun} className="me-2" /> Semester
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    extact
                    to={`/counsellor`}
                    eventKey="profile"
                    className="mb-sm-3 mb-md-0"
                    style={{
                      color: "white",
                    }}
                  >
                    <FontAwesomeIcon icon={faComments} className="me-2" />
                    Counsellor
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    extact
                    to={`/chat`}
                    eventKey="profile"
                    className="mb-sm-3 mb-md-0"
                    style={{
                      color: "white",
                    }}
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                    Chat
                  </Link>
                </Nav.Item>
                <Button onClick={this.logout.bind(this)}>logout</Button>
              </Nav>
            </Navbar.Collapse>

            <Navbar.Toggle aria-controls="navbar-default-primary" />
          </Container>
        </Navbar>
        {/* <Router> */}
        <div>
          <Switch>
            <Route path={`/profile`}>
              <Profile />
            </Route>
            <Route path={`/chat`}>
              <Chat userData={this.props.data} />
            </Route>
            <Route path={`/editStudentProfile`}>
              <EditStudentProfile userData={this.props.data} />
            </Route>
            <Route path={`/semester`}>
              <Semester
                userData={this.props.data}
                current_student_user={
                  JSON.parse(localStorage.getItem("@user_data")).email
                }
                showAdd={true}
              />
            </Route>
            <Route path={`/editsemesterdetails`}>
              <EditSemesterDetails userData={this.props.data} />
            </Route>
            <Route path={`/counsellor`}>
              <Counsellor userData={this.props.data} />
            </Route>
          </Switch>
        </div>
        {/* // </Router> */}
      </div>
    );
  }
}

export default StudentHome;
