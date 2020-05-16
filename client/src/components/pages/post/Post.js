import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import UserService from '../../../service/user.service'
import TagService from '../../../service/tag.service'
import PostService from '../../../service/post.service'

import NewPost from './posts/NewPost'
import MyPosts from './posts/MyPosts'



class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.userService = new UserService()
        this.tagService = new TagService()
        this.postService = new PostService()
    }



    render() {
        console.log("PROPS-POST111111", this.props)
        return (
            <>
                <Switch>
                    <Route path="/post/new" render={props => <NewPost {...props} {...this.props} />} />
                    <Route path="/post/me" render={props => <MyPosts {...props} {...this.props} />} />
                </Switch>
            </>
        )
    }
}
export default Post