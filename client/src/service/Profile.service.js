import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: process.env.REACT_APP_URL,
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    edit = (imageUrl, description,phone, name,_id) => this._service.post('/profile/edit', { phone, description, imageUrl, name})
    
    profile = () => this._service.get('/profile')
    addReservation=(_id,petReservation)=>this._service('/profile/addReservation',{petReservation})
}