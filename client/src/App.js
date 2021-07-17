import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { messaging } from "./init-fcm";
var axios = require("axios");
export class App extends Component {
  async componentDidMount() {
    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        console.log("token", token);

        var data = JSON.stringify({
          id: token,
        });

        var config = {
          method: "post",
          url: "http://localhost:8080/init-notification",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
