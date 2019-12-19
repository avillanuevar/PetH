import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: process.env.REACT_APP_URL,
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    edit = (price, startDay, startMonth, startYear, endDay, endMonth, endYear, client, totalPrice, _id) => this._service.post(`/reservation/edit`, { price, startDay, startMonth, startYear, endDay, endMonth, endYear, client, totalPrice})
    create = ( price,startDay,startMonth,startYear,endDay,endMonth,endYear) => this._service.post('/reservation/create', { price,startDay,startMonth,startYear,endDay,endMonth,endYear})
    addClient=(_id,client)=>this._service('/reservation/addClient',{client})
    details = (id) => this._service.get(`/reservation/details/${id}`)
    delete = (id) => this._service.get(`/reservation/delete/${id}`)
    getAll = ()=>this._service.get('/reservation')
}

