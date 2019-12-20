import React, { Component } from "react";

import NotificationService from "../../service/Notification.service";
import ProfileService from "../../service/Profile.service";
import ReservationService from "../../service/Reservation.service";
import { Container, Row, Col, Modal, button } from "react-bootstrap";
import { Link } from "react-router-dom";

class NotificationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: {}
    };
    this._notificationService = new NotificationService();
    this._profileService = new ProfileService();
    this._reservationService = new ReservationService();
  }
  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });

  componentDidMount = () => {
    const notificationId = this.props.match.params.id;
    this._notificationService
      .details(notificationId)
      .then(theNotification =>
        this.setState({ notification: theNotification.data })
      )
      .then(c => console.log(this.state.notification))
      .catch(err => console.log(err));
  };
  agresiveMessage = pet => {
    if (pet.agresiveWithPeople && pet.agresiveWithAnimals)
      return (<div className='display'><p className='orange '>Aggressive:</p><p> with People & other Animals</p></div>)
    if (pet.agresiveWithPeople) return <div className='display'><p className='orange '>Aggressive:<p> with People</p></p></div>;
    if (pet.agresiveWithAnimals) return <div className='display'><p className='orange '>Aggressive: </p> <p>with other Animals</p></div>;
  };
  accept = e => {
    let copyPets = [...this.state.notification.pets];
    copyPets = copyPets.map(pet => pet._id);

    this._profileService.edit({
      _id: this.state.notification.author._id,
      petReservation: this.state.notification.reciver.houseReservation,
      name: this.state.notification.reciver.name,
      description: this.state.notification.reciver.description,
      phone: this.state.notification.reciver.phone,
      imageUrl: this.state.notification.reciver.imageUrl,
      copyPets: copyPets
    });
    this.props.history.push('/')
   
  };
  eliminateNotification = e => {
    let index = this.state.notification.reciver.notification.indexOf(
      this.state.notification._id
    );
    let notificationCopy = [...this.state.notification.reciver.notification];
    notificationCopy.splice(index, 1);
    this._profileService.edit({
      _id: this.state.notification.reciver._id,
      notification: notificationCopy,
      name: this.state.notification.reciver.name,
      description: this.state.notification.reciver.description,
      phone: this.state.notification.reciver.phone,
      imageUrl: this.state.notification.reciver.imageUrl,
      petReservation: this.state.notification.reciver.houseReservation
    });
    this._notificationService.delete(this.state.notification.reciver._id);
    this.props.history.push('/')
  };

  render() {
    
    return (
      <div className='backDetails'>
      <Container className="pet-details">
        <h1 className='orange marginT'>Petition</h1>
        <section className='home whiteBack' >
          <Row>
            <h3 className='marginP'>
                <strong className='orange'>Reservation From: </strong>{this.state.notification.startDay}/
              {this.state.notification.startMonth}/
              {this.state.notification.startYear} To:{" "}
              {this.state.notification.endDay}/
              {this.state.notification.endMonth}/
              {this.state.notification.endYear}
            </h3>
            <Col md={7}>
              {this.state.notification.pets &&
                this.state.notification.pets.map(pet => (
                  <div>
                    <Row>
                      <Col sm={5}>
                        <img className='imgPetition' src={pet.imageUrl} alt={pet.name}></img>
                      </Col>
                      <Col sm={7}>
                        <h1 className='orange'>
                          {pet.name} | Age:{pet.age}
                        </h1>
                        <p>
                          <strong className='orange'>Descripción:</strong> {pet.description}
                        </p>
                        <hr></hr>
                        <p><strong className='orange'>Care Details: </strong>{pet.careDetails}</p>
                        <p>{this.agresiveMessage(pet)} </p>
                      </Col>
                    </Row>
                  </div>
                ))}
            </Col>
            <Col md={5}>
              {this.state.notification.author && (
                <div>
                  <img
                    src={this.state.notification.author.imageUrl}
                    alt={this.state.notification.author.name}
                  ></img>
                  <p>
                    <strong className='orange'>Name:</strong> {this.state.notification.author.name}
                  </p>
                  <p>
                    <strong className='orange'>Phone Number:</strong>{" "}
                    {this.state.notification.author.phone}
                  </p>
                  <p>
                    <strong className='orange'>Descriotion:</strong>{" "}
                    {this.state.notification.author.description}
                  </p>
                </div>
              )}
            </Col>
          </Row>
          <button as={Link} to='/' onClick={this.accept}>Accept</button>
          <button onClick={this.eliminateNotification}>Decline</button>
        </section>
      </Container>
      </div>
    );
  }
}

export default NotificationDetail;
