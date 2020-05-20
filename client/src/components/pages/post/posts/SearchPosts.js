import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './SearchPosts.css'

import { withRouter } from 'react-router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faTag } from '@fortawesome/free-solid-svg-icons'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import UserService from '../../../../service/user.service'
import TagService from '../../../../service/tag.service'
import PostService from '../../../../service/post.service'

class SearchPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            posts: [],
            tagSelected: [],
            postSelected: [],
            relatedTags: [],
            readingList: this.props.loggedInUser ? this.props.loggedInUser.readingList : [],
        }
        this.userService = new UserService()
        this.tagService = new TagService()
        this.postService = new PostService()
    }

    componentDidMount() {
        this.getAllTags()

    }
    componentDidUpdate(prevProps) {
        const paramsPrev = new URLSearchParams(prevProps.location.search);
        const tagIdPrev = paramsPrev.get("tag");
        const params = new URLSearchParams(this.props.location.search);
        const tagId = params.get("tag");
        if (tagIdPrev !== tagId) {
            this.getAllTags()
            this.getSavedPosts()
        }
    }

    getAllTags = () => {
        this.tagService.getAllTags()
            .then(response => {
                const tags = response.data
                const params = new URLSearchParams(this.props.location.search);
                const tagId = params.get("tag");
                const tagSelected = tags.filter(tag => tag._id == tagId)
                this.setState({ tags, tagSelected })
                this.getPostsRelated(tagId)

            })
            .catch(err => console.log(err))
    }

    getPostsRelated = (tagId) => {
        this.postService.getPostByTag(tagId)
            .then(response => {
                const publishedPost = response.data.filter(post => post.status == "Publicado")
                this.setState({ posts: publishedPost })
                this.getRelatedTags()
                this.getSavedPosts()
                console.log("response.data-POSSSSST", response.data)
            })
            .catch(err => console.log(err))
    }

    getRelatedTags = () => {
        const tags = this.state.posts.reduce((accum, post) => {
            let temp = [...post.tags_id, ...accum]
            return temp
        }, [])
        const tagsSet = new Set(tags)
        const backArrTags = [...tagsSet]
        const nameTags = this.state.tags.filter(tag => backArrTags.includes(tag._id))
        this.setState({ relatedTags: nameTags })
    }

    getSavedPosts = () => {
        const savedPosts = this.state.posts.filter(posts => this.state.readingList.includes(posts._id))
        this.setState({ savedPosts: savedPosts })
        console.log("LISTA DE LECTURAS", this.state.savedPosts)
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
        console.log("PROPSSSS_SEARCH", this.props)
        console.log("POSTSELECTE", this.state.posts)
        console.log("NAMEEEE", this.state.tagSelected)

        const tagName = this.state.tagSelected && this.state.tagSelected.length > 0 ? this.state.tagSelected[0].name : ""

        return (
            <>

                <Container fluid="md" as="section">
                    {this.state.posts.length == 0 ? (
                        <>
                            <h1 id="alert">Opps! no se encontraron resultados.</h1>
                            <img className="notFound" src="/img/undraw_happy_music_g6wc.svg" />
                        </>) :
                        <div className="search">
                            <div className="tags">
                                <p>Tag relacionados Avoka</p>
                                {this.state.tags && this.state.relatedTags.map((tag, idx) => (
                                    <Button size="sm" onClick={() => this.getPostsRelated(tag._id)} className="button">{tag.name}</Button>
                                ))}

                            </div>
                            <div >
                                <h4>Publicaciones relacionadas con {tagName}</h4>
                                <hr></hr>
                                {this.state.posts && this.state.posts.map((post, idx) => (
                                    <Card className="searchPost">
                                        <div className="searchPostInf" key={idx} >
                                            <Link to={`/post/${post._id}`}>
                                                <div>
                                                    <div>
                                                        <div dangerouslySetInnerHTML={this.createMarkup(post.title)} className="searchPostTitle" />
                                                    </div>
                                                    <div dangerouslySetInnerHTML={this.createMarkup(post.theHook)} className="searchPostHook" />
                                                    <div className="searchPostDate">{this.createdAt(post.createdAt)}</div>
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
                                ))}
                            </div>
                        </div>
                    }
                </Container>

            </>
        )
    }
}

export default withRouter(SearchPosts)