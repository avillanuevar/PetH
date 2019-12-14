import React, { Component } from "react";
//import EditPet from "./editPet";
import HostService from "../../service/Host.service";
import UserService from "../../service/Profile.service";
import { Container, Row, Col, Modal, Button,FormControl  } from "react-bootstrap";
import { Link } from "react-router-dom";
import EditHome from  './editHome'
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment";
class HomeDetail extends Component {
  constructor(props) {
    super(props);
    this._userService = new UserService();
    this._hostService = new HostService();
     let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
        let end = moment(start).add(30, "days").subtract(1, "seconds");
        this.applyCallback = this.applyCallback.bind(this);
    this.state = {
      home: {},
      start: start,
      end: end,
      startDate:[],
      endDate:[]
    };
    
  }
  handleShow = () => this.setState({ showModalWindow: true });
  handleClose = () => this.setState({ showModalWindow: false });

  applyCallback(startDate, endDate){
console.log(endDate._d);
console.log(startDate);
     let startArr = startDate._d.toString().split(" "); 
     let endArr = endDate._d.toString().split(" "); 
     let start=[]
     let end=[]
     start.push(startArr[1], startArr[2], startArr[3]);
     end.push(endArr[1], endArr[2], endArr[3]);
     console.log(end)
    
     start[0]=="Jan" && start.splice(0, 1, "01");
     start[0]=="Feb" && start.splice(0, 1, "02");
     start[0]=="Mar" && start.splice(0, 1, "03");
     start[0]=="Apr" && start.splice(0, 1, "04");
     start[0]=="May" && start.splice(0, 1, "05");
     start[0]=="Jun" && start.splice(0, 1, "06");
     start[0]=="Jul" && start.splice(0, 1, "07");
     start[0]=="Aug" && start.splice(0, 1, "08");
     start[0]=="Sep" && start.splice(0, 1, "09");
     start[0]=="Oct" && start.splice(0, 1, "10");
     start[0]=="Nov" && start.splice(0, 1, "11");
     start[0]=='Dec' && start.splice(0, 1, "12");

     end[0]=='Jan' && end.splice(0, 1, "01");
     end[0]=="Feb" && end.splice(0, 1, "02");
     end[0]=="Mar" && end.splice(0, 1, "03");
     end[0]=="Apr" && end.splice(0, 1, "04");
     end[0]=="May" && end.splice(0, 1, "05");
     end[0]=="Jun" && end.splice(0, 1, "06");
     end[0]=="Jul" && end.splice(0, 1, "07");
     end[0]=="Aug" && end.splice(0, 1, "08");
     end[0]=="Sep" && end.splice(0, 1, "09");
     end[0]=="Oct" && end.splice(0, 1, "10");
     end[0]=="Nov" && end.splice(0, 1, "11");
     end[0]=='Dec' && end.splice(0, 1, "12");

    this.setState({
      startDate: start,
      endDate: end
    });
      
     }
  
  
  componentDidMount = () => this.getProfile();
  getProfile = () => {
    this._userService
      .profile()
      .then(user => {
        this._hostService
          .details(user.data.home)
          .then(home => this.setState({ home: home.data }));
      })

      .catch(err => console.log(err));
  };
  petGrooming = () => {
    console.log(this);
    if (this.state.home.petGrooming) return "pet gruming accecible";
  };

  render() {
     let now = new Date();
     let start = moment(
       new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
     );
     let end = moment(start)
       .add(1, "days")
       .subtract(1, "seconds");
     let ranges = {
       "Today Only": [moment(start), moment(end)],
       "Yesterday Only": [
         moment(start).subtract(1, "days"),
         moment(end).subtract(1, "days")
       ],
       "3 Days": [moment(start).subtract(3, "days"), moment(end)]
     };
     let local = {
       format: "DD-MM-YYYY HH:mm",
       sundayFirst: false
     };
    return (
      <Container className="pet-details">
        <section>
          <Row>
            <Col md={6}>
              <h1>{this.state.home.title}</h1>
              <p>
                <strong>Address:</strong>{" "}
                {`${this.state.home.street}, ${this.state.home.city}, ${this.state.home.postalCode}, ${this.state.home.country}`}
              </p>

              <p>I live in a {this.state.home.home}</p>
              <p>{this.petGrooming()} </p>
              <Link to="/home" className="btn btn-dark">
                Volver
              </Link>
              <Button variant="dark" onClick={this.handleShow}>
                Edit your house
              </Button>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <img
                src={this.state.home.imageUrl}
                alt={this.state.home.title}
              ></img>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <DateTimeRangeContainer 
                        ranges={ranges}
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
            </Col>
          </Row>
          <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditHome
                closeModalWindow={this.handleClose}
                update={this.componentDidMount}
                id={this.state.home._id}
              />
            </Modal.Body>
          </Modal>
        </section>
      </Container>
    )
  }
}

export default HomeDetail;
