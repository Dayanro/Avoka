import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Home from './pages/home/Home'
import Navigation from './ui/navbar/Navbar'
import Profile from './pages/profile/Profile'
import Tag from './pages/tag/Tag'
import Interests from './pages/interests/Interests'
import Post from './pages/post/Post'
import ReadingList from './pages/readingList/ReadingList'

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

      <div id="page-container">
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...this.props} />
        <main id="content-wrap">
          <Switch>
            <Route exact path="/" render={props => <Home {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route path="/profile" render={props => <Profile {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route path="/tag" render={props => <Tag {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route path="/interests" render={props => <Interests {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route path="/post" render={props => <Post {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
            <Route path="/readinglist" render={props => <ReadingList {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
          </Switch>
        </main>
        <footer id="footer" className="footer">
          <div className="footertext">
            <div className="about">
            </div>
            <div className="follow">
              <p>Copyright © 2020 AVOKA</p>
            </div>
            <div className="write">
             
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default App
