import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
export class App extends Component {
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
