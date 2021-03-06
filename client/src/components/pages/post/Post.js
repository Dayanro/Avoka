import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import UserService from '../../../service/user.service'
import TagService from '../../../service/tag.service'
import PostService from '../../../service/post.service'

import NewPost from './posts/NewPost'
import MyPosts from './posts/MyPosts'
import PostDetails from './posts/PostDetails'
import UpdatePost from './posts/UpdatePost'
import SearchPosts from './posts/SearchPosts'



class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
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

    updatePosts = (posts) => {
        this.setState({ posts })
    }

    addPost = (post) => {
        const posts = [...this.state.posts, post]
        this.setState({ posts })
    }


    updatePost = (updatedPost) => {
        const tempPosts = [...this.state.posts]
        const filteredPosts = tempPosts.filter(post => post._id !== updatedPost._id)
        filteredPosts.push(updatedPost)
        this.setState({ posts: filteredPosts })
    }

    render() {
        return (
            <>
                <Switch>
                    <Route path="/post/new" render={props => <NewPost {...props} {...this.props} addPost={this.addPost} />} />
                    <Route path="/post/me" render={props => <MyPosts {...props} {...this.props} updatePosts={this.updatePosts} />} />
                    <Route exact path="/post/search" render={props => <SearchPosts {...props} {...this.props} posts={this.state.posts} updatePosts={this.updatePosts} updatePost={this.updatePost} />} />
                    <Route exact path="/post/:id" render={props => <PostDetails {...props} {...this.props} posts={this.state.posts} updatePosts={this.updatePosts} />} />
                    <Route exact path="/post/:id/edit" render={props => <UpdatePost {...props} {...this.props} posts={this.state.posts} updatePosts={this.updatePosts} updatePost={this.updatePost} />} />

                </Switch>
            </>
        )
    }
}
export default Post