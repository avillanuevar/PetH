import React, { Component } from "react";
import { button, Form, Container } from "react-bootstrap";

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
      <section className = 'home0'>
      <Container>
          <h1 className='marginT orange'>SignUp</h1>

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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </Form.Group>
            <button className="paddingSize" type="submit">
            SignUp
          </button>
        </Form>
      </Container>
      </section>
    );
  }
}

export default SignupForm;
