import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: '/api',
            withCredentials: true
        })
    }
    getUserData = (id) => this.service.get(`/users/${id}`)
    updateUserData = (id, { username, email, status, shortBio, avatar }) => this.service.put(`/users/${id}`, { username, email, status, shortBio, avatar })
    deleteUsers = (id) => this.service.delete(`/users/${id}`)
    //profile = ({ username, email, status, shortBio, avatar }) => this.service.get('/api/users', { username, email, status, shortBio, avatar })
}