import React, { Component } from 'react'
import './Profile.css'
import UserService from './../../../service/user.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            username: this.props.username,
            email: this.props.email,
            shortBio: this.props.shortBio,
            avatar: this.props.avatar
        }
        this.UserService = new UserService()
    }

    buildProfile = () => {
        this.setState({ edit: true })
    }

    cancelOption = () => {
        this.props.history.push("/")
    }

    handleSubmit = e => {
        e.preventDefault()
        this.UserService.updateUserData(this.props.id,this.state)
            .then((response) => this.props.setTheUser(response.data))
            .catch(err => console.log(err))
    }

    handleInputChange = e => {
        const { name, value } = e.target
        console.log('target', name, value)
        this.setState({
            [name]: value
        })
    }

    handleFileUpload = e => {

        const uploadData = new FormData()
        uploadData.append("imageUrl", e.target.files[0])
        this.filesService.handleUpload(uploadData)
            .then(response => {
                console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.data.secure_url)
                this.setState({
                    ...this.state, imageUrl: response.data.secure_url
                })
            })
            .catch(err => console.log(err))
    }


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
                                        {avatar ? <img src={avatar} /> : <FontAwesomeIcon icon={faUserAlt} size="5x" color="#f8f9fa" />}
                                    </div>
                                    <input type="file" name="avatar" value={avatar} onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <textarea className="textField" rows="4" cols="50" name="shortBio" form="usrform" value={shortBio} onChange={this.handleInputChange} />
                            <div className="builtProfile" >
                                <Button variant="outline-secondary" onClick={this.cancelOption} style={{ width: "100px", margin: "5px" }} >Cancelar</Button>
                                <Button variant="outline-secondary" type="submit" style={{ width: "100px", margin: "5px" }}>Guardar</Button>
                            </div>
                        </form>
            </>
        )
    }

}

export default EditProfile