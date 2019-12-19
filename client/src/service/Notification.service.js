import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: process.env.REACT_APP_URL,
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    edit = (author,pets,reciver,startDay,startMonth,startYear,endDay,endMonth,endYear, _id) => this._service.post(`/notification/edit`, { author,pets,reciver,startDay,startMonth,startYear,endDay,endMonth,endYear})
    create = ( author,pets,reciver,startDay,startMonth,startYear,endDay,endMonth,endYear) => this._service.post('/notification/create', {author,pets,reciver,startDay,startMonth,startYear,endDay,endMonth,endYear})
    
    details = (id) => this._service.get(`/notification/details/${id}`)
    delete = (id) => this._service.get(`/notification/delete/${id}`)
  
}

