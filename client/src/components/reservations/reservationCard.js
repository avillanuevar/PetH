import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Container,Row,Col } from 'react-bootstrap'
import ResevationService from '../../service/Reservation.service'
import { render } from "react-dom";

class ReservationCard extends Component{
    constructor(props){
        super(props)
         this._reservationService=new ResevationService
        this.home = this.props.details.home
        this.state={
            reservation:{}
        }

    }
    componentDidMount = () => {
        const reservationId = this.props._id;
        console.log(reservationId)
        this._reservationService.details(reservationId)
            .then(reservationFromDB => {
                console.log(reservationFromDB.data)
                return this.setState({ reservation: reservationFromDB.data })
            })
            .then(() => {

                this.filter()
            })
            .then(() => {

                this._reservationService.edit(this.state.reservation)

            })
            .catch(err => console.log("Error", err))
    }

    filter=()=>{

        let startDay = parseInt(this.props.searchDetails.startDay)
        let startMonth = parseInt(this.props.searchDetails.startMonth)
        let startYear = parseInt(this.props.searchDetails.startYear)
        let endDay = parseInt(this.props.searchDetails.endDay)
        let endMonth = parseInt(this.props.searchDetails.endMonth)
        let endYear = parseInt(this.props.searchDetails.endYear)
        const pricePerDay = this.props.price
        let counter = 1
        
        do {
            startDay++
            counter++
            if (startDay == 28 && startMonth == 2) {
                startDay = 0
                startMonth++
            } else if (startDay == 30) {
                if (startMonth == 4 || startMonth == 6 || startMonth == 9 || startMonth == 11) {
                    startDay = 0
                    startMonth++
                }
            } else if (startDay == 31) {
                if (startMonth == 1 || startMonth == 3 || startMonth == 5 || startMonth == 7 || startMonth == 8 || startMonth == 10) {
                    startDay = 0
                    startMonth++
                } else if (startMonth == 12) {
                    startYear++
                    startMonth = 1
                    startDay = 0
                }
            }
            
        } while (startDay != endDay && startMonth != endMonth && startYear != endYear)
        
        const totalPrice=counter * pricePerDay
        this.setState({reservation: { ...this.state.reservation, totalPrice: totalPrice }});
    }
   render(){
       console.log(this.props)
return(
    <div>
    {this.props._id ? ( 
        <Link className='modelLink' to={`/reservationDetails/${this.props._id}`}>
            <Container> 
                <Row >
                        <div className='modalMarginB'>
                    <Col md={3}>
                        <img className='modalImg' src={this.home.imageUrl} alt={this.home.title} />
                    </Col>
                    <Col md={7}>
                       <h3>{this.home.title}</h3> 
                    </Col>
                    <Col md={2}>
                       <h3>{this.state.reservation.totalPrice}$</h3>
                    </Col>
                </div>
                    <hr/>
                </Row>
            </Container>
        </Link>
    ):  null}
    </div>
)
   }

}


 export default ReservationCard
