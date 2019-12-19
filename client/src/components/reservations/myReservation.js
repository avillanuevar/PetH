import React, { Component } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import ProfileService from "../../service/Profile.service";
import { Link } from "react-router-dom";




class MyReservations extends Component {
  constructor(props) {
    super(props);
    this._profileService = new ProfileService();
    this.state = {
      user:{},  
      showModalEditWindow: false,
      showModalHostWindow: false
    };
  }
  handleHostShow = () => this.setState({ showModalHostWindow: true });
  handleHostClose = () => this.setState({ showModalHostWindow: false });
  handleEditShow = () => this.setState({ showModalEditWindow: true });
  handleEditClose = () => this.setState({ showModalEditWindow: false });
  componentDidMount = () => {
    this._profileService
      .profile()
      .then(user => {
        console.log(user.data)
        this.props.setTheUser(user.data)
        this.setState({user:user.data})
    })
      .catch(err => console.log(err));
  };

  render() {
  
      return (
        <>
          <h1>My Reservations</h1>
          <Container>
            <Row>
              {this.state.user.class == "host" ? (
                <div>
                  <Col md={6}>
                    <h2>Reservations for your Pets</h2>
                    {this.state.user.petReservation.map(elm =>
                      elm.client.map(pet => (
                        <img src={pet.imageUrl} alt={pet.name}></img>
                      ))
                    )}
                  </Col>
                  <Col md={6}>
                    <div>
                      <img
                        src={
                          this.state.user.houseReservation.details.home.imageUrl
                        }
                        alt={
                          this.state.user.houseReservation.details.home.title
                        }
                      ></img>
                      <h3>
                        {this.state.user.houseReservation.details.home.title}
                      </h3>
                      {this.state.user.houseReservation.client.map(elm => (
                        <img src={elm.imageUrl} alt={elm.name}></img>
                      ))}
                    </div>
                  </Col>
                </div>
              ) : (
                <div>
                  <h2>Reservations for your Pets</h2>
                  {this.state.user.petReservation? this.state.user.petReservation.map(elm =>
                    elm.client.map(pet => (
                      <img src={pet.imageUrl} alt={pet.name}></img>
                    ))
                  ):null
                  }
                </div>
              )}
            </Row>
          </Container>
        </>
      );
    }
}
export default MyReservations