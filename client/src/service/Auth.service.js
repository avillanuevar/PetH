import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: process.env.REACT_APP_URL,
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    signup = (username, password, name) => this._service.post('/auth/signup', { username, password, name})
    login = (username, password) => this._service.post('/auth/login', { username, password })
    logout = () => this._service.post('/auth/logout')
    loggedin = () => this._service.get('/auth/loggedin')
}