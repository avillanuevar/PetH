import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
          baseURL: process.env.REACT_APP_URL,
          withCredentials: true // RUTAS PERSISTENTES
        });
    }

    edit = ( name,age,description,careDetails,agresiveWithAnimals,agresiveWithPeople,imageUrl,_id) => this._service.post(`/pets/edit`, {  name,age,description,careDetails,agresiveWithAnimals,agresiveWithPeople,imageUrl})
    create = ( name,age,description,careDetails,agresiveWithAnimals,agresiveWithPeople,imageUrl) => this._service.post('/pets/create', {  name,age,description,careDetails,agresiveWithAnimals,agresiveWithPeople,imageUrl})
    
    details = (id) => this._service.get(`pets/details/${id}`)
    delete = (id) => this._service.get(`pets/delete/${id}`)
}