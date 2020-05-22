import React, { Component } from 'react'
import AuthService from './../../../service/auth.service'


import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'


class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loginInfo: {
                username: '',
                password: '',
                email: ''
            },
            errorMessage: ''
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => {
        let loginInfoCopy = { ...this.state.loginInfo }
        const { name, value } = e.target
        loginInfoCopy = { ...loginInfoCopy, [name]: value }

        this.setState({ loginInfo: loginInfoCopy })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.authService.signup(this.state.loginInfo)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/')
                this.onHide();
            })
            .catch(err => {
                err.response.status === 400 && this.setState({ errorMessage: err.response.data.message })
            })
    }

    onHide = () => {
        this.props.onHide();
    }



    render() {
        return (
            <Modal
                size="lg"
                show={true}
                onHide={this.onHide}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Registro de usuario
          </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control name="username" type="text" value={this.state.loginInfo.username} onChange={this.handleInputChange} style={{ width: "680px" }} />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="text" value={this.state.loginInfo.email} onChange={this.handleInputChange} style={{ width: "680px" }} />
                        </Form.Group>

                        <Form.Group controlId="pwd">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control name="password" type="password" value={this.state.loginInfo.password} onChange={this.handleInputChange} style={{ width: "680px" }} />
                        </Form.Group>

                        <p
                            className='error-message'
                            style={{ display: this.state.errorMessage ? 'block' : 'none' }}
                        >{this.state.errorMessage}</p>

                        <Button variant="dark" type="submit">Registrarme</Button>
                    </Form>
                    <p><small>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></small></p>

                </Modal.Body>
            </Modal>
        )
    }
}


export default Signup