import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

import AuthService from './../../../service/auth.service'
import TagService from './../../../service/tag.service'

import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import Select from 'react-dropdown-select';


class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            values: [],
        }
        this.authService = new AuthService()
        this.tagService = new TagService()
    }



    logout = () => {
        this.props.setTheUser(false)
        console.log("PROPS", this.props)
        this.authService.logout()
        // .then(response => {
        //     this.props.history.push('/')
        // })
    }

    showAllTags = () => {
        this.tagService.getAllTags()
            .then(response => {
                const tags = response.data.map(tag => ({ label: tag.name, value: tag.name }))
                this.setState({ tags })
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.showAllTags()
    }

    render() {
        console.log("TAGS",this.state.tags)
        return (
            <Navbar className="navBarMain" expand="lg" sticky="top">
                <div className="logo">
                    <Link to='/' exact className="Home"><Navbar.Brand id="Brand" as="div">Avoka</Navbar.Brand></Link>
                </div>
                <div className="links">
                    <Select
                        multi
                        options={this.state.tags}
                        onChange={(values) => this.onChange(values)} />
                    <Nav.Link as={NavLink} to='/' exact className="about">Acerca de</Nav.Link>
                    <Navbar.Toggle as="button" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="NavLogOut">
                        {
                            !this.props.loggedInUser ?
                                <>
                                    <Nav.Link as={NavLink} to='/login' exact className="LogInButton">Iniciar sesión</Nav.Link>
                                    <Nav.Link as={NavLink} to='/signup' exact className="SignUpButton">Registro</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav className="mr-auto">
                                        <NavDropdown title="Dropdown" alignRight id="basic-nav-dropdown" className="NavDropdown">
                                            <NavDropdown.Item className="UserList">
                                                <Image src="" roundedCircle />
                                                <Navbar.Text className="NavUser">  {this.props.loggedInUser.username}</Navbar.Text>
                                                <Navbar.Text className="NavEmail"> {this.props.loggedInUser.email}</Navbar.Text>
                                            </NavDropdown.Item>

                                            <NavDropdown.Divider />
                                            <Link to='/post/new'><NavDropdown.Item as="div">Nuevo Post</NavDropdown.Item></Link>
                                            <Link to='/post/me'><NavDropdown.Item as="div">Posts</NavDropdown.Item></Link>
                                            <NavDropdown.Item >Lista de Lecturas</NavDropdown.Item>
                                            <Link to='/interests'><NavDropdown.Item as="div">Indica tus Intereses</NavDropdown.Item></Link>
                                            {this.props.loggedInUser.role == "Admin" ?
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
                                </>
                        }
                    </Navbar.Collapse>
                </div>
            </Navbar>

        )
    }

}

export default Navigation