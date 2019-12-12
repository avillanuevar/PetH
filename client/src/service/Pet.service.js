import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/pets',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    edit = ( name,age,description,careDetails,agresiveWithAnimals,agresiveWithPeople,imageUrl,_id) => this._service.post(`/edit`, {  name,age,description,careDetails,agresiveWithAnimals,agresiveWithPeople,imageUrl})
    create = ( name,age,description,careDetails,agresiveWithAnimals,agresiveWithPeople,imageUrl) => this._service.post('/create', {  name,age,description,careDetails,agresiveWithAnimals,agresiveWithPeople,imageUrl})
    
    details = (id) => this._service.get(`/details/${id}`)
    delete = (id) => this._service.get(`/delete/${id}`)
}