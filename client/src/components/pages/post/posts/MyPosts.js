import React, { Component } from 'react'
import './MyPosts.css'
import { Link, NavLink } from 'react-router-dom'


import UserService from '../../../../service/user.service'
import TagService from '../../../../service/tag.service'
import PostService from '../../../../service/post.service'

import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


class MyPosts extends Component {
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
                console.log(response.data)
                const ownPost = data.filter(post => post.owner._id == this.props.loggedInUser._id)
                this.setState({ posts: ownPost })
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getAll()
    }

    draftOnClick = () => {
        this.setState({ status: 'Borrador' })
    }

    publishedOnClick = () => {
        this.setState({ status: 'Publicado' })
    }

    getByStatus = (status) => {
        return this.state.posts.filter(posts => posts.status.includes(status))
    }

    deletePost = (id) => {
        this.postService.deletePost(id)
            .then((response) => {
                const updatePost = this.state.posts.filter(post => post._id !== id)
                this.setState({ posts: updatePost })
            })
            .catch(err => console.log(err))
    }

    createMarkup = (html) => ({ __html: html });

    render() {
        const posts = this.getByStatus(this.state.status)
        return (
            <>
                <Container fluid="md" as="section">
                    <h1>Tus Posts</h1>

                    <Nav justify variant="tabs" defaultActiveKey="link-1">
                        <Nav.Item>
                            <Nav.Link eventKey="link-1" onClick={() => this.draftOnClick()}>Borradores</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" onClick={() => this.publishedOnClick()}>Publicados</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div>
                        {posts && posts.map((post, idx) => (
                            <Card className="post" style={{ borderLeft: "unset", borderRight: "unset", borderTop: "unset" }} key={idx} >
                                <Card.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    < div style={{ flexGrow: "1" }}>
                                        <Link to={`/post/${post._id}`}>
                                            <div>
                                                <div>
                                                    <div dangerouslySetInnerHTML={this.createMarkup(post.title)} className="postTitle" />
                                                </div>
                                                <Card.Text>
                                                    <div dangerouslySetInnerHTML={this.createMarkup(post.theHook)} className="postHook" />
                                                </Card.Text>
                                            </div>
                                        </Link >
                                    </div>
                                    <div className="Buttons" style={{ display: "flex" }}>
                                        <Link to={`/post/${post._id}/edit`}> <div style={{ marginRight: "10px" }}>
                                            <FontAwesomeIcon icon={faPencilAlt} size="1x" color="grey" className="Button" />
                                        </div></Link >
                                        <div onClick={() => this.deletePost(post._id)} >
                                            <FontAwesomeIcon icon={faTrash} size="1x" color="grey" className="Button" />
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>))}
                    </div>
                </Container>
            </>
        )
    }
}
export default MyPosts