import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: process.env.REACT_APP_URL,
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    edit = (imageUrl, description,phone, name) => this._service.post('/profile/edit', { phone, description, imageUrl, name})
    
    profile = () => this._service.get('/profile')
}