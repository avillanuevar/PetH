import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
          baseURL: process.env.REACT_APP_URL,
          withCredentials: true // RUTAS PERSISTENTES
        });
    }

    edit = ({title,imageUrl,street,postalCode,city, country,home,owner,standardPrice,petGrooming,_id}) => {
        console.log(street)
        return  this._service.post(`/host/edit`, {
           title,
           imageUrl,
           street,
           postalCode,
           city,
           country,
           home,
           owner,
           standardPrice,
           petGrooming,
           _id
         });
    }
    create = (title,imageUrl,street,postalCode,city, country,home,owner,standardPrice,petGrooming ) => this._service.post('/host/create', {title, imageUrl,street,postalCode,city, country,home,owner,standardPrice,petGrooming})
    
    details = (id) => this._service.get(`/host/details/${id}`)
    delete = (id) => this._service.get(`/host/delete/${id}`)
}