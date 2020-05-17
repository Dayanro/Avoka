import React, { Component } from 'react'
import { withRouter } from 'react-router'
import './PostDetails.css'

import UserService from '../../../../service/user.service'
import TagService from '../../../../service/tag.service'
import PostService from '../../../../service/post.service'


import Container from 'react-bootstrap/Container'


class PostDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {}
        }
        this.userService = new UserService()
        this.tagService = new TagService()
        this.postService = new PostService()
    }

    componentDidMount() {
        //this.postService.updatePost()
        if (Object.keys(this.props.posts).length > 0) {
            const post = this.props.posts.filter(post => post._id == this.props.match.params.id)[0]
            this.setState({ post })
        }

    }

    componentDidUpdate(prevProps) {
        if (Object.keys(prevProps.posts).length <= 0 && Object.keys(this.props.posts).length > 0) {
            const post = this.props.posts.filter(post => post._id == this.props.match.params.id)[0]
            this.setState({ post })
        }
    }

    // getPostById = () => {
    //     this.postService.getPostById()
    //         .then(response => {
    //             const data = response.data
    //             this.setState({ post: response.data })
    //         })
    //         .catch(err => console.log(err))
    // }

    createMarkup = (html) => ({ __html: html });

    render() {

        const photo = this.state.post ? this.state.post.photo : null
        const title = this.state.post ? this.state.post.title : null
        const theHook = this.state.post ? this.state.post.theHook : null
        const realStory = this.state.post ? this.state.post.realStory : null
        const expandOnThePoint = this.state.post ? this.state.post.expandOnThePoint : null
        const closing = this.state.post ? this.state.post.closing : null
        const readTime = this.state.post ? this.state.post.readTime : null
        const fastReceipe = this.state.post ? this.state.post.fastReceipe : null
        const views = this.state.post ? this.state.post.views : null
        const tags_id = this.state.post ? this.state.post.tags_id : null


        console.log('props', this.props)
        console.log('state', this.state)
        return (
            <>
                <Container>
                    <div dangerouslySetInnerHTML={this.createMarkup(title)} />
                    <div>
                        <img src="/img/undraw_female_avatar_w3jk.svg" className="avatar" />
                        <div>{}</div>
                    </div>
                    <div dangerouslySetInnerHTML={this.createMarkup(theHook)} />
                    {photo ? (<img src={photo} />):null }
                    <div dangerouslySetInnerHTML={this.createMarkup(realStory)} />
                    <div dangerouslySetInnerHTML={this.createMarkup(expandOnThePoint)} />
                    <div dangerouslySetInnerHTML={this.createMarkup(closing)} />
                    <div dangerouslySetInnerHTML={this.createMarkup(fastReceipe)} />

                </Container>
            </>
        )
    }

}
export default withRouter(PostDetails)