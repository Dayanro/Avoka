import React, { Component } from 'react'
import './ReadingList.css'
import { Link, NavLink } from 'react-router-dom'

import UserService from '../../../service/user.service'
import TagService from '../../../service/tag.service'
import PostService from '../../../service/post.service'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'


class ReadingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            readingList: this.props.loggedInUser ? this.props.loggedInUser.readingList : [],
            savedPosts: []
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
                this.getSavedPosts()
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getAll()
    }

    componentDidUpdate = (prevProps) => {
        if (!prevProps.loggedInUser && this.props.loggedInUser) {
            this.setState({ readingList: this.props.loggedInUser.readingList })
            this.getSavedPosts()
        }
    }

    getSavedPosts = () => {
        const savedPosts = this.state.posts.filter(posts => this.state.readingList.includes(posts._id))
        this.setState({ savedPosts: savedPosts })
    }


    save = (postId) => {
        const currentReadingList = [...this.props.loggedInUser.readingList]
        currentReadingList.push(postId)
        const updatedReadingList = [...currentReadingList]
        const updateUser = { ...this.props.loggedInUser, readingList: updatedReadingList }
        this.userService.updateUserData(this.props.loggedInUser._id, updateUser)
            .then((response) => {
                this.props.setTheUser(response.data)
            })
            .catch(err => console.log(err))
        this.setState({ readingList: updateUser })
    }

    unsave = (postId) => {
        const currentReadingList = [...this.props.loggedInUser.readingList]
        let updatedReadingList = currentReadingList.filter(post => post !== postId)
        const updateUser = { ...this.props.loggedInUser, readingList: updatedReadingList }
        this.userService.updateUserData(this.props.loggedInUser._id, updateUser)
            .then((response) => {
                this.props.setTheUser(response.data)
            })
            .catch(err => console.log(err))
        this.setState({ readingList: updateUser })
    }

    displaySaveOptions = (postId) => {
        const { loggedInUser } = this.props
        return (
            <>
                {loggedInUser && loggedInUser.readingList.length && loggedInUser.readingList.includes(postId) ?

                    <div style={{ marginRight: "10px" }} onClick={() => this.unsave(postId)}>
                        <FontAwesomeIcon icon={faBookmark} size="1x" color=" #679186" className="Button1" />
                    </div>
                    :

                    <div style={{ marginRight: "10px" }} onClick={() => this.save(postId)}>
                        <FontAwesomeIcon icon={faBookmark} size="1x" color="#bbd4ce" className="Button1" />
                    </div>}
            </>
        )
    }


    createdAt = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    createMarkup = (html) => ({ __html: html });

    render() {

        return (
            <>
                <Container fluid="md" as="section">
                    <div id="readingTitle">
                        <h2 >Lista de Posts</h2>
                    </div>
                    {this.state.readingList.length == 0 ? (
                        <div className="notFoundReading">
                            <div className="readingAlert">
                                <h3>Lista de Posts</h3>
                                <hr />
                                <p id="alert">Aún no has guardado ningún post. Activando el icono <FontAwesomeIcon icon={faBookmark} size="1x" color="#bbd4ce" className="saveReading" /> de los post podras guardar el post para leer más tarde.</p>
                            </div>
                            <div className="readingImgAlert">
                                <img className="notFoundImg" src="/img/undraw_reading_0re1.svg" />
                            </div>
                        </div>)
                        : this.state.posts && this.state.savedPosts.map((post, idx) => (
                            <>
                                <Card className="searchPost">
                                    <div className="searchPostInf" key={idx} >
                                        <Link to={`/post/${post._id}`}>
                                            <div>
                                                <div>
                                                    <div dangerouslySetInnerHTML={this.createMarkup(post.title)} className="searchPostTitle" />
                                                </div>
                                                <div dangerouslySetInnerHTML={this.createMarkup(post.theHook)} className="searchPostHook" />
                                                <div dangerouslySetInnerHTML={this.createMarkup(post.owner.username)} className="searchPosUsername" />
                                                <div className="searchPostDate">{this.createdAt(post.createdAt)} </div>
                                            </div>
                                        </Link >
                                    </div>
                                    <div className="searchPostSave">
                                        {this.props.loggedInUser ? this.displaySaveOptions(post._id) : null}
                                    </div>
                                    <div className="searchPostImage" style={{ display: "flex", width: '100%', height: '100%' }}>
                                        {post.photo ? (<img className="searchImage" src={post.photo} />) : <img className="searchImage" src="/img/undraw_cooking_lyxy.svg" />}
                                    </div>
                                </Card>

                            </>
                        ))

                    }
                </Container>
            </>
        )
    }
}
export default ReadingList