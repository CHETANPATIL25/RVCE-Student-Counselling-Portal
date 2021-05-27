import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { APP_URL } from "./../environment";
import { Nav, Card, Navbar, Container } from "@themesberg/react-bootstrap";
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
import StudentHome from "./StudentHome";
import TeacherHome from "./TeacherHome";
export class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isLoggedIn: true,
      userData: "something",
    };
  }
  componentDidUpdate() {
    // if(this.props.)
    // console.log(this.props);
  }
  componentDidMount() {
    console.log("userrTpe", localStorage.getItem("@usertype"));
    // componentDidMount() {

    // }
    if (!JSON.parse(localStorage.getItem("isLoggedIn"))) {
      this.setState({ isLoggedIn: false });
    }
    this.renderRedirect();
  }
  renderRedirect = () => {
    if (!this.state.isLoggedIn) {
      return <Redirect to="/login" />;
    }
  };
  render() {
    return (
      <div>
        {this.renderRedirect()}
        {localStorage.getItem("@usertype") === "student" ? (
          <StudentHome data={this.props} />
        ) : (
          <TeacherHome data={this.props} />
        )}
      </div>
    );
  }
}

export default Dashboard;
