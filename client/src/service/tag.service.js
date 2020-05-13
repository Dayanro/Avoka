import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: '/api',
            withCredentials: true
        })
    }
    createTag = ({ name, definition, photo }) => this.service.post('/tags', { name, definition, photo })
    getAllTags = () => this.service.get(`/tags`)
    getTagById = (id) => this.service.get(`/tags/${id}`)
    updateTags = (id, formData) => this.service.put(`/tags/${id}`, formData)
    deleteTags = (id) => this.service.delete(`/tags/${id}`)
}