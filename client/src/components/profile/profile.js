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
      showModalEditWindow: false,
      showModalHostWindow: false
    };
  }
  handleHostShow = () => this.setState({ showModalHostWindow: true });
  handleHostClose = () => this.setState({ showModalHostWindow: false });
  handleEditShow = () => this.setState({ showModalEditWindow: true });
  handleEditClose = () => this.setState({ showModalEditWindow: false });
  componentDidMount = () => this.getProfile();
  getProfile = () => {
    this._profileService
      .profile()
      .then(user => {
        console.log(user)
        this.props.setTheUser(user.data)})
      .catch(err => console.log(err));
  };

  render() {
    if (this.props.loggedInUser) {
      return (
        <>
          <Container>
            <h1>Profile</h1>
            <Button variant="dark" onClick={this.handleHostShow}>
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
                <Button variant="dark" onClick={this.handleEditShow}>
                  Editar Usuario
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                {this.props.loggedInUser.pets.map(pet => {
                  return (
                    <Link to={`/petDetails/${pet._id}`}>
                    
                      <img src={pet.imageUrl} />
                      <p>{pet.name}</p>
                    </Link>
                  );
                })}
              </Col>
              {this.props.loggedInUser.class == "host" && (
                <Col md={6}>
                  <Link to="/myHome">
                    <img src={this.props.loggedInUser.home.imageUrl} />
                    <p>{this.props.loggedInUser.home.title}</p>
                  </Link>
                </Col>
              )}
            </Row>
          </Container>
          <Modal
            show={this.state.showModalEditWindow}
            onHide={this.handleEditClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditProfile
                closeModalWindow={this.handleEditClose}
                update={this.props.setTheUser}
                content={this.props.loggedInUser}
              />
            </Modal.Body>
          </Modal>
          <Modal
            show={this.state.showModalHostWindow}
            onHide={this.handleHostClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Become a host</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateHome
                closeModalWindow={this.handleHostClose}
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
