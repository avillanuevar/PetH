import React, { Component } from "react";
//import EditPet from "./editPet";
import HostService from "../../service/Host.service";
import UserService from "../../service/Profile.service";
import ReservationService from "../../service/Reservation.service";

import { Container, Row, Col, Modal, button,FormControl ,Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditHome from './editHome'
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment";
class HomeDetail extends Component {
  constructor(props) {
    super(props);
    this._userService = new UserService();
    this._hostService = new HostService();
    this._reservationService = new ReservationService();

    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate())
    );
    let end = moment(start)
      .add(30, "days")
      .subtract(1, "seconds");
    this.applyCallback = this.applyCallback.bind(this);
    this.state = {
      home: {},
      start: start,
      end: end,
      reservation:{
        startDay: 0,
        startMonth: 0,
        startYear: 0,
        endDay: 0,
        endMonth: 0,
        endYear: 0,
        price: 15,
      },
      showModalWindowEdit: false,
      showModalWindowReservation: false
    };
  }
  handleEditShow = () => this.setState({ showModalWindowEdit: true });
  handleEditClose = () => this.setState({ showModalWindowEdit: false });
  handleReservationShow = () => this.setState({ showModalWindowReservation: true });
  handleReservationClose = () => this.setState({ showModalWindowEdit: false });

  componentDidMount = () => this.getProfile();
  getProfile = () => {
    this._userService
      .profile()
      .then(user => {
        console.log(user)
        this._hostService
          .details(user.data.home._id)
          .then(home => this.setState({ home: home.data }));
      })

      .catch(err => console.log(err));
  };
  petGrooming = () => {
    console.log(this);
    if (this.state.home.petGrooming) return "pet gruming accecible";
  };
  
  handleSubmit = e => {
    e.preventDefault();
    this._reservationService
      .create(this.state.reservation)
      .then(x => {
       console.log(x)
        this.props.setTheUser(x.data.user);
      })
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({
      reservation: { ...this.state.reservation, [name]: value }
    });
  };

  //Se guardan los valores de las fechas elegidas en las variables stratDate y endDate
  applyCallback(startDate, endDate) {
    console.log(endDate._d);
    console.log(startDate);
    let startArr = startDate._d.toString().split(" ");
    let endArr = endDate._d.toString().split(" ");
    let start = [];
    let end = [];
    start.push(startArr[1], startArr[2], startArr[3]);
    end.push(endArr[1], endArr[2], endArr[3]);
    console.log(end);

    start[0] == "Jan" && start.splice(0, 1, "01");
    start[0] == "Feb" && start.splice(0, 1, "02");
    start[0] == "Mar" && start.splice(0, 1, "03");
    start[0] == "Apr" && start.splice(0, 1, "04");
    start[0] == "May" && start.splice(0, 1, "05");
    start[0] == "Jun" && start.splice(0, 1, "06");
    start[0] == "Jul" && start.splice(0, 1, "07");
    start[0] == "Aug" && start.splice(0, 1, "08");
    start[0] == "Sep" && start.splice(0, 1, "09");
    start[0] == "Oct" && start.splice(0, 1, "10");
    start[0] == "Nov" && start.splice(0, 1, "11");
    start[0] == "Dec" && start.splice(0, 1, "12");

    end[0] == "Jan" && end.splice(0, 1, "01");
    end[0] == "Feb" && end.splice(0, 1, "02");
    end[0] == "Mar" && end.splice(0, 1, "03");
    end[0] == "Apr" && end.splice(0, 1, "04");
    end[0] == "May" && end.splice(0, 1, "05");
    end[0] == "Jun" && end.splice(0, 1, "06");
    end[0] == "Jul" && end.splice(0, 1, "07");
    end[0] == "Aug" && end.splice(0, 1, "08");
    end[0] == "Sep" && end.splice(0, 1, "09");
    end[0] == "Oct" && end.splice(0, 1, "10");
    end[0] == "Nov" && end.splice(0, 1, "11");
    end[0] == "Dec" && end.splice(0, 1, "12");

    let starDay = start[1]
    let startMonth = start[0]
    let startYear = start[2]
    let endDay = end[1]
    let endMonth = end[0]
    let endYear = end[2]
    this.setState({
      reservation: {
        ...this.state.reservation, startDay: starDay, startMonth: startMonth, startYear: startYear, endDay: endDay, endMonth: endMonth, endYear: endYear}});
  }


  render() {
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, "days")
      .subtract(1, "seconds");
    let local = {
      format: "DD-MM-YYYY HH:mm",
      sundayFirst: false
    };
    return (
      <Container className="pet-details">
        <section className='home0'>
          <div className=''>
              <h1 className='marginT orange'>{this.state.home.title}</h1>
          <Row>
            <Col md={6}>
              <p>
                <strong>Address:</strong>{" "}
                {`${this.state.home.street}, ${this.state.home.city}, ${this.state.home.postalCode}, ${this.state.home.country}`}
              </p>

              <p>I live in a {this.state.home.home}</p>
              <p>{this.petGrooming()} </p>
              <Link to="/home" className="btn btn-dark">
                Volver
              </Link>
              <button variant="dark" onClick={this.handleEditShow}>
                Edit your house
              </button>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <img
                src={this.state.home.imageUrl}
                alt={this.state.home.title}
              ></img>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
            </Col>
          </Row>
            </div>
            <p>Select Dates</p>
              <DateTimeRangeContainer
                start={this.state.start}
                end={this.state.end}
                local={local}
                applyCallback={this.applyCallback}
              >
                <FormControl
                  id="formControlsTextB"
                  type="text"
                  label="Text"
                  placeholder="Enter text"
                />
              </DateTimeRangeContainer>
          <Form onSubmit={this.handleSubmit}>
      
        
                      <Form.Group>
              <Form.Label className='marginD'>Pride per day</Form.Label>
              <Form.Control
                type="number"
                name="price"
                onChange={this.handleInputChange}
                value={this.state.reservation.price}
              />
            </Form.Group>

            <button variant="dark" size="sm" type="submit">
              Post Reservation
          </button>
          </Form>
          <Modal
            show={this.state.showModalWindowEdit}
            onHide={this.handleEditClose}
          >
            <Modal.Header closebutton>
              <Modal.Title>Edit Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditHome
                closeModalWindow={this.handleEditClose}
                update={this.componentDidMount}
                id={this.state.home._id}
              />
            </Modal.Body>
          </Modal>
        </section>
      </Container>
    );
  }
}

export default HomeDetail;
