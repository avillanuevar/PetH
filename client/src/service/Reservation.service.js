import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/reservation',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    edit = (price, startDay, startMonth, startYear, endDay, endMonth, endYear, clients, totalPrice, _id) => this._service.post(`/edit`, { price, startDay, startMonth, startYear, endDay, endMonth, endYear, clients, totalPrice})
    create = ( price,startDay,startMonth,startYear,endDay,endMonth,endYear) => this._service.post('/create', { price,startDay,startMonth,startYear,endDay,endMonth,endYear})
    
    details = (id) => this._service.get(`/details/${id}`)
    delete = (id) => this._service.get(`/delete/${id}`)
    getAll = ()=>this._service.get('/')
}

