import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import './Navbar.css'

import AuthService from './../../../service/auth.service'
import TagService from './../../../service/tag.service'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'

import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Signup from '../../pages/signup/Signup'
import Login from '../../pages/login/Login'

import Select from 'react-dropdown-select';


class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hideNavBar: true,
            tags: [],
            values: [],
            showLogin: false,
            showSignup: false,
        }
        this.authService = new AuthService()
        this.tagService = new TagService()
    }

    logout = () => {
        this.props.setTheUser(false)
        this.authService.logout()
            .then(response => {
                this.props.history.push('/')
            })
    }

    showAllTags = () => {
        this.tagService.getAllTags()
            .then(response => {
                const tags = response.data.map(tag => ({ label: tag.name, value: tag._id }))
                this.setState({ tags })
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.showAllTags()
        window.addEventListener('scroll', this.hideBar)
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.hideBar)
    }

    hideBar = () => {
        if (window.scrollY > 200 && this.state.hideNavBar) {
            this.setState({ hideNavBar: false })
        } else if (window.scrollY <= 100 && !this.state.hideNavBar) {
            this.setState({ hideNavBar: true })
        }
    }



    searchPost = (value) => {
        const tagId = value[0].value
        this.props.history.push({
            pathname: ('/post/search'),
            search: `?tag=${tagId}`
        });
    }

    showLogin = () => {
        this.setState({ showLogin: true })
    }


    showSignup = () => {
        this.setState({ showSignup: true })
    }

    hideLogin = () => {
        this.setState({ showLogin: false })
    }

    hideSignup = () => {
        this.setState({ showSignup: false })
    }

    render() {
        console.log("Props", this.props)
        const hideClass = this.state.hideNavBar && this.props.location.pathname == "/" ? "hide" : "";

        return (
            <Navbar className={`navBarMain ${hideClass}`} expand="lg" sticky="top">
                <div className="logo">
                    <Link to='/' exact className="Home"><Navbar.Brand id="Brand" as="div">Avoka</Navbar.Brand></Link>
                </div>
                <div className="links">
                    {
                        this.props.loggedInUser ?
                            <div className="bookMarkNav">
                                <Link to='/readingList'><FontAwesomeIcon icon={faBookmark} color="#cccccc" size="2x" className="uttonNav" /></Link>
                            </div> : null}
                    <div className="searchNavBar">
                        <Select className="searchNav"
                            style={{ width: '200px', marginRight: '20px', alignItems: 'center', borderRadius: '3px', lineHeight: "40px" }}
                            placeholder={`Busquedas por Tags`}
                            loading={this.state.tags.length < 0 ? true : false}
                            searchable="true"
                            options={this.state.tags}
                            onChange={(value) => this.searchPost(value)} />
                    </div>
                    <Navbar.Toggle as="button" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="NavLogOut">
                        {
                            !this.props.loggedInUser ?
                                <>
                                    <Nav.Link onClick={this.showLogin} className="authButton">Iniciar sesión</Nav.Link>
                                    <Nav.Link onClick={this.showSignup} className="authButton">Registro</Nav.Link>
                                </>
                                :
                                <div>
                                    <Nav className="mr-auto">
                                        <NavDropdown title={
                                            <div className="pull-left">
                                                {this.props.loggedInUser.avatar ? <img src={this.props.loggedInUser.avatar} className="profilePictNav" /> : <img className="profilePictNav" src="/img/undraw_female_avatar_w3jk.svg" />}
                                            </div>}
                                            alignRight id="basic-nav-dropdown" className="NavDropdown">
                                            <NavDropdown.Item className="userList">
                                                <Link to="/profile"><div clasName="sectionAvatar">
                                                    {this.props.loggedInUser.avatar ? <img src={this.props.loggedInUser.avatar} className="notFoundAvatarDrow" /> : <img className="notFoundAvatarDrow" src="/img/undraw_female_avatar_w3jk.svg" />}

                                                </div></Link>
                                                <div className="sectionInf">
                                                    <Navbar.Text className="NavUser">  {this.props.loggedInUser.username}</Navbar.Text>
                                                    <Navbar.Text className="NavEmail"> {this.props.loggedInUser.email}</Navbar.Text>
                                                </div>
                                            </NavDropdown.Item>

                                            <NavDropdown.Divider />
                                            <Link to='/post/new'><NavDropdown.Item as="div">Nuevo Post</NavDropdown.Item></Link>
                                            <Link to='/post/me'><NavDropdown.Item as="div">Posts</NavDropdown.Item></Link>
                                            <Link to='/readingList'><NavDropdown.Item as="div">Lista de Lecturas</NavDropdown.Item></Link>
                                            <Link to='/interests'><NavDropdown.Item as="div">Indica tus Intereses</NavDropdown.Item></Link>
                                            {this.props.loggedInUser.role === "Admin" ?
                                                <>
                                                    <NavDropdown.Divider />
                                                    <Link to='/tag'><NavDropdown.Item as="div">Edición de Tags</NavDropdown.Item></Link>
                                                </>
                                                : null}
                                            <NavDropdown.Divider />
                                            <Link to="/profile"><NavDropdown.Item as="div">Perfil</NavDropdown.Item></Link>
                                            <NavDropdown.Item onClick={this.logout}>Cerrar sesión</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </div>
                        }
                    </Navbar.Collapse>
                </div>
                {this.state.showLogin ? <Login {...this.props} setTheUser={this.props.setTheUser} onHide={this.hideLogin} /> : null}
                {this.state.showSignup ? <Signup {...this.props} setTheUser={this.props.setTheUser} onHide={this.hideSignup} /> : null}
            </Navbar>

        )
    }

}

export default withRouter(Navigation)