import React, { Component } from "react";
import EditPet from './editPet'
import PetService from "../../service/Pet.service";
import { Container, Row, Col, Modal,Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class PetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pet: {},
  };
    this._petService = new PetService();
  }
  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });
  
  componentDidMount = () => {
    const petId = this.props.match.params.id;
    this._petService
      .details(petId)
      .then(thePet => this.setState({ pet: thePet.data }))
      .catch(err => console.log(err));
  };
  agresiveMessage = ()=>{
    if (this.state.pet.agresiveWithPeople && this.state.pet.agresiveWithAnimals)return "Aggressive: with People & other Animals"
    if (this.state.pet.agresiveWithPeople) return 'Aggressive: with People'
    if (this.state.pet.agresiveWithAnimals) return 'Aggressive: with other Animals'
    
  }

  render() {
    return (
      <Container className="pet-details">
        <section>
          <Row>
            <Col md={6}>
              <h1>{this.state.pet.name} | Age:{this.state.pet.age}</h1>
              <p>
                <strong>Descripción:</strong> {this.state.pet.description}
              </p>
              <hr></hr>
              <p>
                  Care Details: {this.state.pet.careDetails}
              </p>
               <p>{this.agresiveMessage()} </p>
              <Link to="/myPets" className="btn btn-dark">
                Volver
              </Link>
              <Button variant="dark" onClick={this.handleShow}>
                Edit your pet
                </Button>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <img
                src={this.state.pet.imageUrl}
                alt={this.state.pet.name}
              ></img>
            </Col>
          </Row>
          <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Tell us about your pet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditPet
                closeModalWindow={this.handleClose}
                update={this.componentDidMount}
                id={this.state.pet._id}
              />
            </Modal.Body>
          </Modal>
        </section>
      </Container>
    );
  }
}

export default PetDetail;
