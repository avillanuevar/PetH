import React, { Component } from "react";
import ReservationService from "../../service/Reservation.service";
import ReservationCard from './reservationCard'

class Search extends Component {
    constructor(props) {
        super(props)
        this._reservationService = new ReservationService
        this.state = {
            result:[],
            reservations:[]
           
            }
          

        }
    componentDidMount= () => {
    this._reservationService.getAll()
        .then(allReservationsFromDB => {
            console.log(allReservationsFromDB.data,this.props.search)
            return this.setState({ reservations: allReservationsFromDB.data })})
        .then(() => {
            this.filter()
            console.log(this.state.result)
        }) 
        .catch(err => console.log("Error", err))
}
    filter=()=>{
        const searchValue=this.props.search
        
        const startValueS = (parseFloat(searchValue.startYear) + parseFloat(searchValue.startMonth / 100) + parseFloat(searchValue.startDay / 10000))
        const endValueS = parseFloat(searchValue.endYear) + parseFloat(searchValue.endMonth / 100) + parseFloat(searchValue.endDay/10000)
        let res=[]
   
        console.log(searchValue)
        console.log(endValueS)
        for(let i=0;i<this.state.reservations.length;i++){
            const startValueR = this.state.reservations[i].startYear + (this.state.reservations[i].startMonth / 100) + (this.state.reservations[i].startDay / 10000)
            const endValueR = this.state.reservations[i].endYear + (this.state.reservations[i].endMonth / 100) + (this.state.reservations[i].endDay / 10000)
            console.log(startValueR)
            console.log(endValueR)
            console.log(this.state.reservations[i])

            if (searchValue.startYear || searchValue.city){
                if (searchValue.city){
                    if (searchValue.city == this.state.reservations[i].details.home.city){
                        if (searchValue.startYear){
                            if(startValueS>=startValueR&&endValueR>=endValueS){
                                res.push(this.state.reservations[i])
                            }console.log('llegue al final y falle')
                        } 

                    }else console.log(' casi llegue al final y falle')
                } else if (startValueS >= startValueR && endValueR >= endValueS){
                    res.push(this.state.reservations[i])
                    }
            }

        }
        console.log('en la funcion',res)
        return this.setState({result:res})
    }

        render(){
            return(
                <div>
                    {this.state.result.map(reservation => (<ReservationCard key={reservation._id} {...reservation} searchDetails={this.props.search}/>))}

                </div>
            )
        }
    }
 export default Search