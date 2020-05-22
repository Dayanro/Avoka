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
                show={true}
                onHide={this.onHide}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header style={{ borderBottom: 'none', fontFamily: 'Rozha One, serif' }} closeButton />
                <Modal.Body style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '40px', marginBottom: '30px', fontFamily: 'Rozha One, serif', textAlign: 'center' }}>
                        Registro de usuario
                    </div>
                    <Form style={{ marginLeft: '0' }} onSubmit={this.handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Control style={{ marginLeft: '0' }} name="username" placeholder="Nombre de usuario" type="text" value={this.state.loginInfo.username} onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Control style={{ marginLeft: '0' }} name="email" placeholder="Email" type="text" value={this.state.loginInfo.email} onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="pwd">
                            <Form.Control style={{ marginLeft: '0' }} name="password" placeholder="Contraseña" type="password" value={this.state.loginInfo.password} onChange={this.handleInputChange} />
                        </Form.Group>

                        <p
                            className='error-message'
                            style={{ display: this.state.errorMessage ? 'block' : 'none' }}
                        >{this.state.errorMessage}</p>

                        <Button style={{ marginTop: '20px' }} variant="dark" type="submit">Registrarme</Button>
                    </Form>
                    <p style={{ textAlign: 'center', marginTop: '15px' }}><small>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></small></p>

                </Modal.Body>
            </Modal>
        )
    }
}


export default Signup