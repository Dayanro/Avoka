import React, { Component } from 'react'
import './Tag.css'
import UserService from '../../../service/user.service'
import TagService from '../../../service/tag.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Tag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            name: "",
            definition: "",
            photo: "",
            showCreateModal: false,
            hideCreateodal: true
        }
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

    showAddModal = () => {
        this.setState({ showCreateModal: true })
    }

    onHide = () => {
        this.setState({ showCreateModal: false })
    }


    render() {
        return (
            <>
                <Container fluid="sm" >
                    <div style={{ display: "flex" }}>
                        <h1 style={{ flexGrow: '1' }}>Tablero de Tags</h1>
                        <span onClick={this.showAddModal} style={{ alignSelf: 'center' }}><FontAwesomeIcon icon={faPlus} size="2x" color="grey" className="ButtonAdd" /></span>
                    </div>
                    <hr />
                    <Row >
                        {this.state.tags.map(tag => (
                            <Col sm={4}>
                                <Card className="cards" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={tag.photo} style={{ width: "20px" }} />
                                    <Card.Body>
                                        <Card.Title>{tag.name}</Card.Title>
                                        <Card.Text>{tag.definition}</Card.Text>
                                    </Card.Body>
                                    <div className="Buttons">
                                        <FontAwesomeIcon icon={faEdit} size="1x" color="grey" className="Button" />
                                        <FontAwesomeIcon icon={faTrash} size="1x" color="grey" className="Button" />
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>

                <Modal
                    size="lg"
                    show={this.state.showCreateModal}
                    onHide={this.onHide}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Crear Tag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Control name="name" type="file" value={this.state.photo} onChange={this.handleInputChange} style={{ width: "680px" }} />
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control name="name" type="text" value={this.state.name} onChange={this.handleInputChange} style={{ width: "680px" }} />
                            </Form.Group>

                            <Form.Group controlId="pwd">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control name="password" type="text" value={this.state.definition} onChange={this.handleInputChange} style={{ width: "680px" }} />
                            </Form.Group>
                            <Button variant="dark" type="submit">Crear</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}

export default Tag