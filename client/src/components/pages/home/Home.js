import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Home.css'

import UserService from '../../../service/user.service'
import TagService from '../../../service/tag.service'
import PostService from '../../../service/post.service'
import BackgroundVideo from "../backgroundVideo/BackgroundVideo"

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBookmark } from '@fortawesome/free-regular-svg-icons'


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
                {loggedInUser && loggedInUser.readingList.length && loggedInUser.readingList.includes(postId) ?

                    <div style={{ marginRight: "10px" }} onClick={() => this.unsave(postId)}>
                        <FontAwesomeIcon icon={faBookmark} size="1x" color=" #679186" className="Button1" />
                    </div>
                    :

                    <div style={{ marginRight: "10px" }} onClick={() => this.save(postId)}>
                        <FontAwesomeIcon icon={faBookmark} size="1x" color="#cccccc" className="Button1" />
                    </div>}
            </>
        )
    }

    render() {
        console.log("POSTHOME", this.state.posts)

        return (
            <>
                <header className="hero">
                    <BackgroundVideo />

                    <div className="homeText">
                        <h1>Avoka</h1>
                    </div>

                    {/* <img className="pictureHero" src="/img/Hero_avoka.jpg"></img>
                    <div className="homeText">
                        <h1>Historias</h1>
                        <h1>Saludables</h1>

                    </div> */}
                </header>
                <div className="textOverVideo">

                </div>
                <Container fluid="lg" as="section" className="containerHome">
                    <h1 id="titleHome">Últimas Publicaciones</h1>
                    <hr id="hrHome"></hr>
                    <div className="homePost"  >
                        <div>
                            {this.state.posts && this.state.posts.map((post, idx) => (
                                <Card className="post" key={idx} >
                                    <div className="postInfo" >
                                        <Link to={`/post/${post._id}`}>
                                            <div className="postContainer">
                                                <div dangerouslySetInnerHTML={this.createMarkup(post.title)} className="postTitle" id="postTitle" />
                                                <div dangerouslySetInnerHTML={this.createMarkup(post.theHook)} className="postHook" id="postHook" />
                                                <div className="postUsername" id="postUsername" >{post.owner.username}</div>
                                                <div className="postDate" id="postDate">{this.createdAt(post.createdAt)}</div>
                                            </div>
                                        </Link >
                                    </div>
                                    <div className="postSave">
                                        {this.props.loggedInUser ?
                                            this.displaySaveOptions(post._id) : null}
                                    </div>
                                    <div className="postImage" style={{ display: "flex", width: '100%', height: '100%' }}>
                                        {post.photo ? (<img className="homeImg" src={post.photo} />) : <img className="homeImg" src="/img/undraw_cooking_lyxy.svg" />}
                                    </div>
                                </Card>))}
                        </div>

                        <div className="side">
                            <h2 id="titleSide">Post populares en Avoka</h2>
                            <hr></hr>
                            <div>
                                {this.state.posts && this.state.popularPosts.map((post, idx) => (
                                    <div className="popularPost" key={post.id} >
                                        <div className="postItem">
                                            <div id="popularNumb">0{idx + 1}</div>
                                        </div>
                                        <div className="postInfo" >
                                            <Link to={`/post/${post._id}`}>
                                                <div id="sideContainer">
                                                    <div dangerouslySetInnerHTML={this.createMarkup(post.title)}  id="popularTitle" />
                                                    <div dangerouslySetInnerHTML={this.createMarkup(post.theHook)} id="popularHook" />
                                                    <div id="popularUsername">{post.owner.username}</div>
                                                    <div id="popularDate">{this.createdAt(post.createdAt)}</div>
                                                </div>
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