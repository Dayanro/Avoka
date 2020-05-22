import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loginInfo: {
                username: '',
                password: ''
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
        this.authService.login(this.state.loginInfo)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.onHide();
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
                err.response.status === 401 && this.setState({ errorMessage: err.response.data.message })
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
                <Modal.Body style={{textAlign: 'center'}}>
                    <div style={{ fontSize: '40px', marginBottom: '30px', fontFamily: 'Rozha One, serif', textAlign: 'center'}}>
                        Inicio de sesión
                    </div>
                    <Form style={{marginLeft: '0'}}onSubmit={this.handleSubmit}>

                        <Form.Group controlId="name">
                            <Form.Control style={{ marginLeft: '0' }} placeholder="Nombre de usuario" name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="pwd">
                            <Form.Control style={{ marginLeft: '0' }} placeholder="Contraseña" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
                        </Form.Group>

                        <p
                            className='error-message'
                            style={{ display: this.state.errorMessage ? 'block' : 'none' }}
                        >{this.state.errorMessage}</p>

                        <Button style={{marginTop: '20px'}} variant="dark" type="submit">Iniciar sesión</Button>
                    </Form>

                    <p style={{textAlign: 'center', marginTop: '15px'}}><small>¿No tienes cuenta? <Link to="/signup">Regístrate</Link></small></p>


                </Modal.Body>
            </Modal>

        )
    }
}


export default Login