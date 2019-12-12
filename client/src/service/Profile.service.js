import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/profile',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    edit = (imageUrl, description,phone, name) => this._service.post('/edit', { phone, description, imageUrl, name})
    
    profile = () => this._service.get('/')
}