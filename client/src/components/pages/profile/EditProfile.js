import React, { Component } from 'react'
import './Profile.css'
import UserService from './../../../service/user.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'


class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            username: this.props.username,
            email: this.props.email,
            shortBio: this.props.shortBio,
            avatar: this.props.avatar,
            loadComplete: true,
            showToast: false
        }
        this.UserService = new UserService()
    }

    buildProfile = () => {
        this.setState({ edit: true })
    }

    cancelOption = () => {
        this.props.closeEdit()
    }

    handleSubmit = e => {
        e.preventDefault()
        const uploadData = new FormData()
        uploadData.append("avatar", this.state.avatar)
        uploadData.append("username", this.state.username)
        uploadData.append("email", this.state.email)
        uploadData.append("shortBio", this.state.shortBio)
        this.UserService.updateUserData(this.props.id, uploadData)
            .then((response) => {
                this.props.setTheUser(response.data)
                this.setState({ showToast: true })
            })
            .catch(err => console.log(err))
    }

    handleInputChange = e => {
        const value = e.target.type === "file" ? e.target.files[0] : e.target.value
        this.setState({ [e.target.name]: value })
    }

    closeToast = () => this.setState({ showToast: false });
    render() {
        const { username, email, shortBio, avatar } = this.state;
        const name = username.charAt(0).toUpperCase() + username.slice(1)
        console.log('AVATAR', avatar)
        return (
            <>
                <form onSubmit={this.handleSubmit} className="updateData">
                    <div style={{ display: "flex" }}>
                        <div>
                            <input className="input" type="text" style={{ fontSize: "30px" }} name="username" value={username} onChange={this.handleInputChange} />
                            <input className="input" type="text" style={{ fontSize: "16px" }} name="email" value={email} onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <div className="avatar">
                                {avatar ? <img src={this.state.avatar} /> : <FontAwesomeIcon icon={faUserAlt} size="5x" color="#f8f9fa" />}
                            </div>
                            <input type="file" name="avatar" onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <textarea className="textField" rows="4" cols="50" name="shortBio" value={shortBio} onChange={this.handleInputChange} />
                    <div className="builtProfile" >
                        <Button variant="outline-secondary" onClick={this.cancelOption} style={{ width: "100px", margin: "5px" }} >Regresar</Button>
                        <Button variant="outline-secondary" type="submit" style={{ width: "100px", margin: "5px" }}>Guardar</Button>
                    </div>
                </form>
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    style={{
                        maxHeight: '100px',
                    }}
                >
                    <Toast show={this.state.showToast} onClose={this.closeToast}
                        style={{
                            position: 'absolute',
                            top: 70,
                            right: 70,
                            maxHeight: '100px',
                        }}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded mr-2"
                                alt=""
                            />
                            <strong className="mr-auto">{name}</strong>
                        </Toast.Header>
                        <Toast.Body>la información ha sido actualizada!</Toast.Body>
                    </Toast>
                </div>
            </>
        )
    }

}

export default EditProfile