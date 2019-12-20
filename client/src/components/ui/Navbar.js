import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../../service/Auth.service";
import ProfileService from "../../service/Profile.service";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this._authService = new AuthService();
    this._profileService = new ProfileService();
    this.state = {
      reservationRecuest: []
    };
  }
  logoutUser = () => {
    this._authService.logout()
      .then(x => this.props.setUser(false))
      .catch(err => console.log(err))
  }

  host = () => {
    return (
      this.props.loggedInUser.class == "host" && (
        <Nav.Link as="li">
          <Link className='link' to="/myHome">My Home</Link>
        </Nav.Link>
      )
    );
  };

  componentDidMount = () => {
    this._profileService
      .profile()
      .then(user => {
        console.log(user);
        this.props.setUser(user.data);
      })
      
      .catch(err => console.log(err));
  };

  render() {
    const saludo = this.props.loggedInUser
      ? this.props.loggedInUser.name
      : "Guest";
    return this.props.loggedInUser ? (
      <Navbar className='nav'     expand="md">
        <Navbar.Brand>
          <Nav.Link className='padding0' as="li">
            <Link className='link logo' to="/">PetH</Link>
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link as="li">
              <Link className='link' to="/profile"><strong>Profile</strong></Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link className='link' to="/myPets">Pets</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link className='link' to="/reservations">Reservations</Link>
            </Nav.Link>
            {this.host()}
            <NavDropdown  id="basic-nav-dropdown">
              {this.props.loggedInUser.notification&&(
              this.props.loggedInUser.notification.map(elm => (
                <NavDropdown.Item>
                  <Link className='link orange' to={`requestDetail/${elm._id}`}>New Request</Link>
                </NavDropdown.Item>
              ))
              )}
            </NavDropdown>

            <Nav.Link className="link" as="li" onClick={this.logoutUser}>
              Logout
            </Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            <Navbar.Text>Welcome {saludo}</Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    ) : (
        <Navbar className='nav' expand="md">
          <Navbar.Brand>
            <Nav.Link as="li">
              <Link className='link logo' to="/">PetH</Link>
            </Nav.Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link as="li">
              <Link className='link' to="/">Home</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link className='link' to="/signup">SignUp</Link>
            </Nav.Link>
            <Nav.Link as="li">
              <Link className='link' to="/login">Login</Link>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Navbar.Text>Welcome {saludo}</Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
