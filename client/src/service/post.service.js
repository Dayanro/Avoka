import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }
    createPost = (post) => this.service.post('/posts', post)
    getAllPost = () => this.service.get(`/posts`)
    getPostByTag = (tagId) => this.service.get(`/posts?tag=${tagId}`)
    getPostById = (id) => this.service.get(`/posts/${id}`)
    updatePost = (id, formData) => this.service.put(`/posts/${id}`, formData)
    deletePost = (id) => this.service.delete(`/posts/${id}`)
}