import React from "react";
import { Container, Row, button, Modal } from "react-bootstrap";
import UserService from "../../service/Profile.service";
import PetService from "../../service/Pet.service";
import PetCard from "./petCard";
import NewPet from "./newPet";

class MyPets extends React.Component {
  constructor(props) {
    super(props);
    this._userService = new UserService();
    this._petService = new PetService();
    this.state = {
      showModalWindow: false
    };
  }

  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });
  componentDidMount = () => this.getProfile();
  getProfile = () => {
    this._userService
      .profile()
      .then(user => this.props.setTheUser(user.data))
      .catch(err => console.log(err));
  };
  deletePet = pet => {
    this._petService.delete(pet);
    this.getProfile();
    
  };

  render() {
    if (this.props.loggedInUser) {
      console.log(this.props.loggedInUser.pets);
      return (
        <section className='home'>
          <Container>
            <h1 className='marginT orange marginB0'>Your Pets</h1>

            <button className='marginEdit secMarginB' onClick={this.handleShow}>
              Add a new pet
            </button>

            <Row>
              {this.props.loggedInUser.pets.map(pet => (
                <PetCard
                  key={pet._id}
                  {...pet}
                  deletePet={this.deletePet.bind(this)}
                />
              ))}
            </Row>
          </Container>

          <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
            <Modal.Header closebutton>
              <Modal.Title>Tell us about your pet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NewPet
                closeModalWindow={this.handleClose}
                update={this.getProfile}
                setTheUser={this.props.setTheUser}
              />
            </Modal.Body>
          </Modal>
        </section>
      );
    } else return null;
  }
}

export default MyPets;
