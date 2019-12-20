import React, { Component } from "react";

import Service from "../../service/Auth.service";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this._service = new Service();
    this.state = {
      showToast: false,
      toastText: "",
      user: { username: "", password: "" }
    };
  }

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({
      user: { ...this.state.user, [name]: value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state.user;
    this._service
      .login(username, password)
      .then(theLoggedUser => {
        this.props.setUser(theLoggedUser.data);
        this.setState({ username: "", password: "" });
        this.props.history.push("/"); // REDIRECCIONAMIENTO
      })
      .catch(err => {
        this.handleToastOpen(err.response.data.message);
      });
  };

  handleToastClose = () => this.setState({ showToast: false, toastText: "" });
  handleToastOpen = text => this.setState({ showToast: true, toastText: text });

  render() {
    return (
      <section className='home0'>
        <h1 className='marginT'>Iniciar sesión</h1>

        <form onSubmit={this.handleSubmit}>
          <div className='imgPetCard'>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              onChange={this.handleInputChange}
              value={this.state.username}
            />
          </div>
          <div className='imgPetCard orange'>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
      </section>
    );
  }
}

export default LoginForm;
