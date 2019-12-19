import React, { Component } from "react";

import NotificationService from "../../service/Notification.service";
import ProfileService from "../../service/Profile.service";
import ReservationService from "../../service/Reservation.service";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
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
      return "Aggressive: with People & other Animals";
    if (pet.agresiveWithPeople) return "Aggressive: with People";
    if (pet.agresiveWithAnimals) return "Aggressive: with other Animals";
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
    // this.state.notification.pets.map(pet=>{
    //     console.log(pet)
    //   this._reservationService.addClient({_id:this.state.notification.reciver.houseReservation,client:pet._id})
    //     this.eliminateNotification()
    // })
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
  };

  render() {
    console.log(this.state.notification);
    return (
      <Container className="pet-details">
        <h1>hola</h1>
        <section>
          <Row>
            <h3>
              Reservation From: {this.state.notification.startDay}/
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
                        <img src={pet.imageUrl} alt={pet.name}></img>
                      </Col>
                      <Col sm={7}>
                        <h1>
                          {pet.name} | Age:{pet.age}
                        </h1>
                        <p>
                          <strong>Descripción:</strong> {pet.description}
                        </p>
                        <hr></hr>
                        <p>Care Details: {pet.careDetails}</p>
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
                    <strong>Name:</strong> {this.state.notification.author.name}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>{" "}
                    {this.state.notification.author.phone}
                  </p>
                  <p>
                    <strong>Descriotion:</strong>{" "}
                    {this.state.notification.author.description}
                  </p>
                </div>
              )}
            </Col>
          </Row>
          <Button onClick={this.accept}>Accept</Button>
          <Button onClick={this.eliminateNotification}>Decline</Button>
        </section>
      </Container>
    );
  }
}

export default NotificationDetail;
