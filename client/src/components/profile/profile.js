import React, { Component } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import ProfileService from "../../service/Profile.service";
import { Link } from "react-router-dom";
import EditProfile from "./editProfile";
import CreateHome from "../host/createHome";


class Profile extends Component {
  constructor(props) {
    super(props);
    this._profileService = new ProfileService();
    this.state = {
      showModalWindow: false,
      showModalWindow2: false
    };
  }
  handleShow2 = () => this.setState({ showModalWindow2: true });
  handleClose2 = () => this.setState({ showModalWindow2: false });
  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });
  componentDidMount = () => this.getProfile();
  getProfile = () => {
    this._profileService
      .profile()
      .then(user => this.props.setTheUser(user.data))
      .catch(err => console.log(err));
  };

  render() {
    if (this.props.loggedInUser) {
      return (
        <>
          <Container>
            <h1>Profile</h1>
            <Button variant="dark" onClick={this.handleShow2}>
             Become a Host
            </Button>
            <Row>
              <Col md={6}>
                <img
                  className="img"
                  src={this.props.loggedInUser.imageUrl}
                  alt={this.props.loggedInUser.name}
                ></img>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Name:</strong> {this.props.loggedInUser.name}
                </p>
                <p>
                  <strong>Phone Number:</strong> {this.props.loggedInUser.phone}
                </p>
                <p>
                  <strong>Descriotion:</strong>{" "}
                  {this.props.loggedInUser.description}
                </p>
                <Button variant="dark" onClick={this.handleShow}>
                  Editar Usuario
                </Button>
              </Col>
            </Row>
            <p>{this.props.loggedInUser.pets[0].name}</p>
          </Container>
          <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditProfile
                closeModalWindow={this.handleClose}
                update={this.props.setTheUser}
                content={this.props.loggedInUser}
              />
            </Modal.Body>
          </Modal>
          <Modal show={this.state.showModalWindow2} onHide={this.handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Become a host</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateHome
                closeModalWindow={this.handleClose2}
                update={this.getProfile}
                setTheUser={this.props.setTheUser}
              />
            </Modal.Body>
          </Modal>
        </>
      );
    } else {
      return null;
    }
  }
}
export default Profile;
