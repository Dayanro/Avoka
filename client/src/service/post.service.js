import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: '/api',
            withCredentials: true
        })
    }
    createPost = (formData) => this.service.post('/posts', formData)
    getAllPost = () => this.service.get(`/posts`)
    getPostById = (id) => this.service.get(`/posts/${id}`)
    updatePost = (id, formData) => this.service.put(`/posts/${id}`, formData)
    deletePost = (id) => this.service.delete(`/posts/${id}`)
}