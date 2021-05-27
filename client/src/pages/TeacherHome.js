import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { APP_URL } from "./../environment";
import { Nav, Card, Navbar, Container } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TeacherProfile from "./TeacherProfile";
import {
  faComments,
  faSun,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import Profile from "./Profile";
import EditStudentProfile from "./EditStudentProfile";
import Semester from "./Semester";
import Counsellor from "./Counsellor";
import StudentListForTeacher from "./StudentListForTeacher";
import EditTeacherProfile from "./EditTeacherProfile";
import { Button } from "@themesberg/react-bootstrap";
import ShowStudentWholeDetails from "./ShowStudentWholeDetails";
export class TeacherHome extends Component {
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
                  <Link
                    extact
                    to={`/`}
                    eventKey="profile"
                    className="mb-sm-3 mb-md-0"
                    style={{
                      color: "white",
                    }}
                  >
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                    Home
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link
                    extact
                    to={`/teacherprofile`}
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
                <Button onClick={this.logout.bind(this)}>logout</Button>
              </Nav>
            </Navbar.Collapse>

            <Navbar.Toggle aria-controls="navbar-default-primary" />
          </Container>
        </Navbar>
        {/* <Router> */}
        <div>
          <Switch>
            <Route exact path={`/`}>
              <StudentListForTeacher userData={this.props.data} />
            </Route>
            <Route path={`/editTeacherProfile`}>
              <EditTeacherProfile userData={this.props.data} />
            </Route>
            <Route path={`/teacherprofile`}>
              <TeacherProfile userData={this.props.data} />
            </Route>
            <Route path={`/studentwholedetails`}>
              <ShowStudentWholeDetails userData={this.props.data} />
            </Route>
            <Route path={`/semester`}>
              <Semester
                userData={this.props.data}
                current_student_user={localStorage.getItem(
                  "@current_student_mail"
                )}
                showAdd={false}
              />
            </Route>
          </Switch>
        </div>
        {/* // </Router> */}
      </div>
    );
  }
}

export default TeacherHome;
