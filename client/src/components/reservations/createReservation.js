import React, { Component } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import ReservationService from "../../service/Reservation.service";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment";

class PetForm extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(20, "days")
      .subtract(1, "seconds");
      this._reservationService = new ReservationService();
      this.state = {
          reservation: {
              Price: 0,
              start: start,
              end: end,
              startDate: [],
              endDate: []
            }
        };
        this.applyCallback = this.applyCallback.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this._reservationService
      .create(this.state.reservation)
      .then(x => {
        this.props.closeModalWindow();
        this.props.update();
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

  applyCallback(startDate, endDate) {
    console.log(endDate._d);
    console.log(startDate);
    this.setState({
      start: start,
      end: end
    });
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

    this.setState({
      startDate: start,
      endDate: end
    });
  }

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
     let maxDate = moment(start).add(24, "hour");
    return (
      <div>
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
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
            <Form.Label>Pride per day</Form.Label>
            <Form.Control
              type="number"
              name="price"
              onChange={this.handleInputChange}
              value={this.state.reservation.price}
            />
          </Form.Group>


          <Button variant="dark" size="sm" type="submit">
            Post Reservation
          </Button>
        </Form>
      </div>
    );
  }
}

export default PetForm;
