import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/host',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    edit = ({title,imageUrl,street,postalCode,city, country,home,owner,standardPrice,petGrooming,_id}) => {
        console.log(street)
        return  this._service.post(`/edit`, {
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
    create = (title,imageUrl,street,postalCode,city, country,home,owner,standardPrice,petGrooming ) => this._service.post('/create', {title, imageUrl,street,postalCode,city, country,home,owner,standardPrice,petGrooming})
    
    details = (id) => this._service.get(`/details/${id}`)
    delete = (id) => this._service.get(`/delete/${id}`)
}