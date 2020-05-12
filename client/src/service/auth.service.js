import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: '/api',
            withCredentials: true
        })
    }

    signup = ({ username, password, email }) => this.service.post('/users', { username, password, email })
    login = ({ username, password }) => this.service.post('/session', { username, password })
    logout = () => this.service.delete('/session')
    isLoggedIn = () => this.service.get('/loggedin')

}