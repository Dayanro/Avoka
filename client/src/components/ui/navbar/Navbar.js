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
                                        <NavDropdown.Item >Nuevo Post</NavDropdown.Item>
                                        <NavDropdown.Item >Posts</NavDropdown.Item>
                                        <NavDropdown.Item >Lista de Lecturas</NavDropdown.Item>
                                        <NavDropdown.Item as="div"><Link to='/interests'>Indica tus Intereses</Link></NavDropdown.Item>
                                        {this.props.loggedInUser.role == "Admin" ?
                                            <>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item as="div"><Link to='/tag'>Edición de Tags</Link></NavDropdown.Item>
                                            </>
                                            : null}
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as="div"><Link to="/profile">Perfil</Link></NavDropdown.Item>
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