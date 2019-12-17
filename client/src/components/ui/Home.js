import React, { Component } from "react";
import { Container, Row, Col, Modal, Button, FormControl, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment";
import SearchHome from '../reservations/searchHome'

class Home extends Component{
    constructor(){
        super()
        let now = new Date();
        let start = moment(
            new Date(now.getFullYear(), now.getMonth(), now.getDate())
        );
        let end = moment(start)
            .add(30, "days")
            .subtract(1, "seconds");
        this.applyCallback = this.applyCallback.bind(this);
        this.state={
            start: start,
            end: end,
            reservation: {
                startDay: 0,
                startMonth: 0,
                startYear: 0,
                endDay: 0,
                endMonth: 0,
                endYear: 0,
                city:''
            },
            showModalWindowSearch: false

        }
    }

    handleSearchShow = () => this.setState({ showModalWindowSearch: true });
    handleSearchClose = () => this.setState({ showModalWindowSearch: false });

    handleSubmit = e => {
        e.preventDefault();
           this.handleSearchShow()
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
                ...this.state.reservation, startDay: starDay, startMonth: startMonth, startYear: startYear, endDay: endDay, endMonth: endMonth, endYear: endYear
            }
        });
    }

    render(){
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

        return(
            <Container className="pet-details">
            <h1>hola</h1>
            <section>
                <Row>
                        <Col md={6}>
                            <label>introduce dates</label>
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
                        </Col>
                   
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Where do you need it?</Form.Label>
                                    <Form.Control
                                        type="string"
                                        name="city"
                                        onChange={this.handleInputChange}
                                        value={this.state.reservation.city}
                                    />
                                </Form.Group>

                                <Button variant="dark" size="sm" type="submit">
                                    Search for Peth
                                 </Button>

                            </Form>
                       
                </Row>
                    <Modal
                        show={this.state.showModalWindowSearch}
                        onHide={this.handleSearchClose}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Search Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SearchHome
                               search={this.state.reservation}
                            />
                        </Modal.Body>
                    </Modal>
            </section>
            </Container>
        )
    }
}
export default Home;