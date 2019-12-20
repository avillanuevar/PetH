import React, { Component } from "react";
import { button, Modal, Container, Row, Col } from "react-bootstrap";
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
        <div className='whiteBackDetail'>
          <section className='backDetails secMarginB'>
          <Container>
            <h1 className='marginT orange marginB0'>Profile</h1>
              <button className='marginHost' onClick={this.handleHostShow}>
              Become a Host
            </button>
            <Row>
              <Col md={6}>
                <img
                  className='profileImg'
                  src={this.props.loggedInUser.imageUrl}
                  alt={this.props.loggedInUser.name}
                ></img>
              </Col>
              <Col md={6}>
                  <div className='marginTProf'>
                <p>
                  <strong className='orange'>Name:</strong> {this.props.loggedInUser.name}
                </p>
                <p>
                    <strong className='orange'>Phone Number:</strong> {this.props.loggedInUser.phone}
                </p>
                <p>
                    <strong className='orange'>Descriotion:</strong>{" "}
                  {this.props.loggedInUser.description}
                </p>
                  <button className='marginEdit' onClick={this.handleEditShow}>
                  Editar Usuario
                </button>
                  </div>
              </Col>
            </Row>
            </Container>
            </section>
            <Container>
            <Row>
              <Col md={6}>
                <h3 className='orange textCenter secMarginB'>My Pets</h3>
                {this.props.loggedInUser.pets&&this.props.loggedInUser.pets.map(pet => {
                  return (
                    <Link className='display around link buttonDetails' to={`/petDetails/${pet._id}`}>
                    
                      <img className='detailsImg' src={pet.imageUrl} />
                      <p className='profileP'>{pet.name}</p>
                    </Link>
                  );
                })}
              </Col>
              {this.props.loggedInUser.class == "host" && (
                <Col md={6}>
                  <h3 className='orange textCenter secMarginB'>My Home</h3>
                  <Link className='textCenter link' to="/myHome">
                    <div className='buttonHomeP'>
                      <img className='imgHomrP' src={this.props.loggedInUser.home.imageUrl} />
                    
                    <h4>{this.props.loggedInUser.home.title}</h4>
                    </div>
                  </Link>
                </Col>
              )}
            </Row>
          </Container>
          <Modal
            show={this.state.showModalEditWindow}
            onHide={this.handleEditClose}
          >
            <Modal.Header closebutton>
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
            <Modal.Header closebutton>
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
          </div>
      );
    } else {
      return null;
    }
  }
}
export default Profile;
