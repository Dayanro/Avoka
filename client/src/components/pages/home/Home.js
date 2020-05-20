import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Home.css'

import UserService from '../../../service/user.service'
import TagService from '../../../service/tag.service'
import PostService from '../../../service/post.service'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            popularPosts: [],
            readingList: this.props.loggedInUser ? this.props.loggedInUser.readingList : []
        }
        this.userService = new UserService()
        this.tagService = new TagService()
        this.postService = new PostService()
    }

    getAllPost = () => {
        this.postService.getAllPost()
            .then(response => {
                const publishedPost = response.data.filter(post => post.status == "Publicado")
                this.setState({ posts: publishedPost })
                this.popularPosts()
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getAllPost()
    }

    createdAt = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    popularPosts = () => {
        const tempPosts = [...this.state.posts]
        const sortPosts = tempPosts.sort((a, b) => {
            return b.views - a.views
        })
        const popularOnes = sortPosts.slice(0, 5)
        this.setState({ popularPosts: popularOnes })
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
    }


    createMarkup = (html) => ({ __html: html });

    displaySaveOptions = (postId) => {
        const { loggedInUser } = this.props
        return (
            <>
                {loggedInUser && loggedInUser.readingList.length  && loggedInUser.readingList.includes(postId) ?

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

    render() {

        return (
            <>
                <Container fluid="md" as="section">
                    <h1></h1>
                    <div className="homePost"  >
                        <div>
                            {this.state.posts && this.state.posts.map((post, idx) => (
                                <Card className="post" key={idx} >
                                    <div className="postInfo" >
                                        <Link to={`/post/${post._id}`}>
                                            <div>
                                                <div>
                                                    <div dangerouslySetInnerHTML={this.createMarkup(post.title)} className="postTitle" />
                                                </div>
                                                <div dangerouslySetInnerHTML={this.createMarkup(post.theHook)} className="postHook" />
                                                <div className="postDate">{this.createdAt(post.createdAt)}</div>
                                            </div>
                                        </Link >
                                    </div>
                                    <div className="postSave">
                                        {this.props.loggedInUser ?
                                            this.displaySaveOptions(post._id) : null}


                                    </div>
                                    <div className="postImage" style={{ display: "flex" }}>
                                        {post.photo ? (<img className="image" src={post.photo} />) : <img className="searchImage" src="/img/undraw_cooking_lyxy.svg" />}
                                    </div>
                                </Card>))}
                        </div>

                        <div className="side">
                            <h4>Post populares en Avoka</h4>
                            <hr></hr>
                            <div>
                                {this.state.posts && this.state.popularPosts.map((post, idx) => (
                                    <div className="popularPost" key={post.id} >
                                        <div className="postItem">
                                            <h2>0{idx + 1}</h2>
                                        </div>
                                        <div className="postInfo" >
                                            <Link to={`/post/${post._id}`}>
                                                <div>
                                                    <div dangerouslySetInnerHTML={this.createMarkup(post.title)} className="postTitle" />
                                                </div>
                                                <div dangerouslySetInnerHTML={this.createMarkup(post.theHook)} className="postHook" />
                                                <div className="postDate">{this.createdAt(post.createdAt)}</div>
                                            </Link >
                                        </div>
                                    </div>))}
                            </div>
                        </div>
                    </div>
                </Container>

            </>
        )
    }
}
export default Home