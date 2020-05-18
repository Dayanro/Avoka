import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Home from './pages/home/Home'
import Navigation from './ui/navbar/Navbar'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Tag from './pages/tag/Tag'
import Interests from './pages/interests/Interests'
import Post from './pages/post/Post'

import AuthService from './../service/auth.service'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { loggedInUser: null }
    this.authService = new AuthService()
  }


  setTheUser = userObj => this.setState({ loggedInUser: userObj }, () => console.log('El estado de App ha cambiado:', this.state))

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.authService.isLoggedIn()
        .then(response => this.setTheUser(response.data))
        .catch(() => this.setTheUser(false))
    }
  }

  render() {
    this.fetchUser()

    return (

      <>
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...this.props} />

        <main>

          <Switch>
            <Route exact path="/" render={props => <Home {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route path="/signup" render={props => <Signup {...props} setTheUser={this.setTheUser} />} />
            <Route path="/login" render={props => <Login {...props} setTheUser={this.setTheUser} />} />
            <Route path="/profile" render={props => <Profile {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route path="/tag" render={props => <Tag {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route path="/interests" render={props => <Interests {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route path="/post" render={props => <Post {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
          </Switch>

        </main>
      </>
    )
  }
}

export default App
