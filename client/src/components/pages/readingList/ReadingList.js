import React, { Component } from 'react'
import './ReadingList.css'
import { Link, NavLink } from 'react-router-dom'


import UserService from '../../../service/user.service'
import TagService from '../../../service/tag.service'
import PostService from '../../../service/post.service'

import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


class ReadingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            draftPosts: [],
            publishedPosts: [],
            post: [],
            posts: [],
            status: 'Borrador',
        }
        this.userService = new UserService()
        this.tagService = new TagService()
        this.postService = new PostService()
    }

    getAll = () => {
        this.postService.getAllPost()
            .then(response => {
                const data = response.data
                this.setState({ posts: response.data })
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getAll()
    }


    createMarkup = (html) => ({ __html: html });

    render() {
        return (
            <>
                <Container fluid="md" as="section">
     
                </Container>
            </>
        )
    }
}
export default ReadingList