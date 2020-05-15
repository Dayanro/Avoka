import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,//'/api',
            withCredentials: true
        })
    }
    createTag = (formData) => this.service.post('/tags', formData)
    getAllTags = () => this.service.get(`/tags`)
    getTagById = (id) => this.service.get(`/tags/${id}`)
    updateTags = (id, formData) => this.service.put(`/tags/${id}`, formData)
    deleteTags = (id) => this.service.delete(`/tags/${id}`)
}