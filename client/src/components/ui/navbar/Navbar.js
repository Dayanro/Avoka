import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/Navbar'
import '../navbar/Navbar.css'
import AuthService from './../../../service/auth.service'
import { Link, NavLink } from 'react-router-dom'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.authService = new AuthService()
    }
    logout = () => {
        this.props.setTheUser(false)
        console.log("PROPS", this.props)
        this.authService.logout()
        // .then(response => {
        //     this.props.history.push('/')
        // })
    }

    render() {
        return (
            <Navbar bg="light" expand="lg" sticky="top">
                <Navbar.Brand id="Brand" as="div">Avoka</Navbar.Brand>
                <Form inline>
                    <div><img src="icon.svg" style={{ width: "30px" }} /></div>

                    <FormControl as='input' type="text" placeholder="Search Avoka" className="mr-sm-2" />
                </Form>
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
                                    <Nav.Link as={NavLink} to='/' exact className="Home">Home</Nav.Link>

                                    <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="NavDropdown">
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
            </Navbar>

        )
    }

}

export default Navigation