import React, { Component } from 'react'
import './Profile.css'
import UserService from './../../../service/user.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditProfile from './EditProfile'
//import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false
        }
        this.UserService = new UserService()
    }
    buildProfile = () => {
        this.setState({ edit: true })
    }

    closeEdit = () => {
        this.setState({ edit: false })
    }
    render() {
        const username = this.props.loggedInUser ? this.props.loggedInUser.username : "";
        const name = this.props.loggedInUser ? username.charAt(0).toUpperCase() + username.slice(1) : ""
        const email = this.props.loggedInUser ? this.props.loggedInUser.email : "";
        const shortBio = this.props.loggedInUser ? this.props.loggedInUser.shortBio : "";
        const avatar = this.props.loggedInUser ? this.props.loggedInUser.avatar : "";
        const id = this.props.loggedInUser ? this.props.loggedInUser._id : "";

        return (
            <>
                {
                    this.props.loggedInUser ?
                        <Container as="section">
                            {
                                !this.state.edit ?
                                    <>
                                        <div style={{ display: "flex" }}>
                                            <div style={{ flexGrow: "1" }}>
                                                <h1>{name}</h1>
                                                <h5>{email}</h5>
                                            </div>
                                            <div>
                                                <Button id="edit" variant="outline-secondary" onClick={this.buildProfile}>Editar</Button>
                                            </div>
                                            <div className="avatar">
                                                {avatar ? <img src={avatar} /> : <FontAwesomeIcon icon={faUserAlt} size="5x" color="#f8f9fa" />}
                                            </div>
                                        </div>
                                        <div className="shortBio">
                                            {shortBio ? <p>{shortBio}</p> : <h5>{name} aún no ha estado activo en Avoka.</h5>}
                                        </div>
                                    </>
                                    :
                                    <EditProfile id={id} username={username} email={email} avatar={avatar} shortBio={shortBio} setTheUser={this.props.setTheUser} closeEdit={this.closeEdit} />
                            }
                        </Container>
                        :
                        <h1>NO ESTA AUTORIZADO</h1>
                }
            </>
        )
    }

}

export default Profile