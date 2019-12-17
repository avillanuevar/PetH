import React, { Component } from "react";
import ReservationService from "../../service/Reservation.service";

class ReservationDetails extends Component{
    constructor(){
        super()
        this._reservationService=new ReservationService
        this.state={
            reservation:{}
        }
    }
    componentDidMount = () => {
        const reservationId = this.props.match.params.id;
        console.log(reservationId)
        this._reservationService.details(reservationId)
            .then(reservationFromDB => {
                return this.setState({ reservation: reservationFromDB.data })
            })
            .then(() => {
                
                console.log(this.state.result)
            })
            .catch(err => console.log("Error", err))
    }
    render(){
        return(
            <h1>{this.state.reservation.details.home.title}</h1>
        )
    }

}
export default ReservationDetails