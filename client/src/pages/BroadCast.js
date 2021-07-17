import React, { Component } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
  Alert,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BgImage from "../assets/img/illustrations/signin.svg";
import { Link, Redirect } from "react-router-dom";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      body: "",
      imageUrl: "",
      isSend: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {}
  callback = (response) => {
    this.setState({ isSend: true });
    console.log(JSON.stringify(response.data));
  };
  handleSubmit = (event) => {
    event.preventDefault();
    var data = JSON.stringify({
      title: this.state.topic,
      body: this.state.body,
      image: this.state.imageUrl,
    });

    var config = {
      method: "post",
      url: "http://localhost:8080/broadcast",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(this.callback)
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div style={{ topMargin: 25 }}>
        {this.state.isSend ? (
          <Alert variant="success">BroadCast Is Sent</Alert>
        ) : null}

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
                  <h3 className="mb-0">BroadCast Message</h3>
                </div>
                <Form className="mt-4" onSubmit={this.handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Topic</Form.Label>
                    <InputGroup>
                      <Form.Control
                        autoFocus
                        type="text"
                        placeholder="enter topic here"
                        value={this.state.topic}
                        onChange={(e) => {
                          this.setState({ topic: e.target.value });
                        }}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>BroadCast Message</Form.Label>
                      <InputGroup>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          type="text"
                          placeholder="enter BroadCast message"
                          value={this.state.body}
                          onChange={(e) => {
                            this.setState({ body: e.target.value });
                          }}
                        />
                      </InputGroup>
                    </Form.Group>
                    {/*  */}
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>BroadCast Image Url</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="enter image url"
                          value={this.state.imageUrl}
                          onChange={(e) => {
                            this.setState({ imageUrl: e.target.value });
                          }}
                          isInvalid={this.state.passwordValid}
                        />
                      </InputGroup>
                    </Form.Group>
                    {/*  */}
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    send
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
