import React, { Component } from 'react'
import './Interests.css'
import UserService from '../../../service/user.service'
import TagService from '../../../service/tag.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Interests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            interest: this.props.loggedInUser ? this.props.loggedInUser.interest : []
        }
        this.userService = new UserService()
        this.tagService = new TagService()
    }

    getAll = () => {
        this.tagService.getAllTags()
            .then(response => this.setState({ tags: response.data }))
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getAll()
    }

    componentDidUpdate = (prevProps) => {
        if (!prevProps.loggedInUser && this.props.loggedInUser) {
            this.setState({ interest: this.props.loggedInUser.interest })
        }
    }


    customizeInterest = (tagId) => {
        const currentInterest = [...this.state.interest]
        currentInterest.push(tagId)
        const updatedInterest = [...currentInterest]
        const updateUser = { ...this.props.loggedInUser, interest: updatedInterest }
        this.userService.updateUserData(this.props.loggedInUser._id, updateUser)
            .then((response) => {
                this.props.setTheUser(response.data)
            })
            .catch(err => console.log(err))
        this.setState({ interest: updatedInterest })
    }


    deleteInterest = (tagId) => {
        const currentInterests = [...this.state.interest]
        let updatedInterest = currentInterests.filter(tag => tag !== tagId)
        const updateUser = { ...this.props.loggedInUser, interest: updatedInterest }
        this.userService.updateUserData(this.props.loggedInUser._id, updateUser)
            .then((response) => {
                this.props.setTheUser(response.data)
            })
            .catch(err => console.log(err))
        this.setState({ interest: updatedInterest })
    }

    render() {

        return (
            <>
                <Container fluid="sm" >
                    <h1>Indica tus Intereses</h1>
                    <hr />
                    <Row >
                        {this.state.tags && this.state.tags.map(tag => {
                            const marked = this.state.interest.includes(tag._id)
                            return (
                                <Col sm={4}>
                                    <Card className="cards"  >
                                        <div style={{ display: "flex" }}>
                                            <Card.Body >
                                                <Card.Title>{tag.name}</Card.Title>
                                            </Card.Body>

                                            <div >
                                                {marked ? (
                                                    <div className="buttons" style={{ background: "#288695" }} onClick={() => this.deleteInterest(tag._id)}  >
                                                        <FontAwesomeIcon icon={faCheck} size="1x" color="white" />
                                                    </div>)
                                                    :
                                                    (<div className="buttons" onClick={() => this.customizeInterest(tag._id)}  >
                                                        <FontAwesomeIcon icon={faPlus} size="1x" color="grey" />
                                                    </div>)}
                                            </div>

                                        </div>
                                        <Card.Img variant="top" src={tag.photo} style={{ width: "100%" }} />
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>

            </>
        )
    }
}

export default Interests