import React, { Component } from "react";
import { Button, Form, Container } from "react-bootstrap";

import Service from "../../service/Auth.service";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = { username: "", password: "", name: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password, name } = this.state;
    this._service
      .signup(username, password, name)
      .then(theNewUser => {
        this.props.setUser(theNewUser.data);
        this.setState({ username: "", password: "", name: "" });
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Container>
        <h1>Registro</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="username"
              onChange={this.handleInputChange}
              value={this.state.username}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="text"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Registrarme
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignupForm;
