import React, { Component } from "react";
import event from "../../events";
import { Grid, Header, Icon, Form, Message } from "semantic-ui-react";
import { Button } from "@themesberg/react-bootstrap";

export class LoginPage extends Component {
  state = {
    nickname: "",
    error: "",
  };

  componentDidMount() {
    let json = JSON.parse(localStorage.getItem("@user_data"));

    this.setState({ nickname: json.email });
  }

  isvalid = ({ nickname }) => nickname;

  setUser = ({ user, isUser }) => {
    if (isUser) {
      this.setState({ error: "This nickname already taken" });
    } else {
      this.setState({ error: "" });
      this.props.setUser(user);
    }
  };

  handleChange = (e) => {
    this.setState({ nickname: e.target.value });
  };

  handleSubmit = () => {
    let { socket } = this.props;
    let { nickname } = this.state;
    socket.emit(event.IS_USER, nickname, this.setUser);
  };

  render() {
    return (
      <Grid
        style={{ height: "100vh", padding: "0px", margin: "0px" }}
        textAlign="center"
        verticalAlign="middle"
      >
        <Grid.Column computer={6} tablet={8} mobile={14}>
          <Form size="small" onSubmit={this.handleSubmit}>
            <Form.Input
              name="nickname"
              type="text"
              placeholder="Your nickname !"
              // onChange={this.handleChange}
              value={this.state.nickname}
              autoFocus
            />

            <Button
              variant="primary"
              className="m-1"
              onClick={this.handleSubmit}
            >
              Open Chats
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginPage;
