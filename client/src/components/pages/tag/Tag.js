import React, { Component } from 'react'
import './Tag.css'
import TagService from '../../../service/tag.service'
import EditTag from './EditTag'
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
            showUpdateModal: false,
            hideCreateodal: true,
            selectedTagId: null
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

    handleInputChange = e => {
        const value = e.target.type === "file" ? e.target.files[0] : e.target.value
        this.setState({ [e.target.name]: value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const uploadData = new FormData()
        uploadData.append("photo", this.state.photo)
        uploadData.append("name", this.state.name)
        uploadData.append("definition", this.state.definition)
        this.tagService.createTag(uploadData)
            .then((response) => {
                const updateTag = [...this.state.tags]
                updateTag.push(response.data)
                this.setState({ tags: updateTag, showCreateModal: false })
            })
            .catch(err => console.log(err))
    }

    handleUpdateSubmit = (e, id, name, photo, definition) => {
        e.preventDefault()
        const uploadData = new FormData()
        uploadData.append("photo", photo)
        uploadData.append("name", name)
        uploadData.append("definition", definition)
        this.tagService.updateTags(id, uploadData)
            .then((response) => {
                let newArray=this.state.tags.filter(tag => tag._id !== id)
                newArray.push(response.data)
                this.setState({ tags: newArray, showUpdateModal: false })
            })
            .catch(err => console.log(err))
    }

    showAddModal = () => {
        this.setState({ showCreateModal: true })
    }

    showUpdateModal = (id) => {
        this.setState({ showUpdateModal: true, selectedTagId: id })
    }

    onHide = () => {
        this.setState({ showCreateModal: false, showUpdateModal: false })
    }

    deleteTag = (id) => {
        this.tagService.deleteTags(id)
            .then((response) => {
                const updateTag = this.state.tags.filter(tag => tag._id !== id)
                this.setState({ tags: updateTag })
            })
            .catch(err => console.log(err))
    }

    render() {

        const selectedTag = this.state.selectedTagId ? this.state.tags.filter(tag => tag._id == this.state.selectedTagId)[0] : {}
        
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
                                    <Card.Img variant="top" src={tag.photo} style={{ width: "100%" }} />
                                    <Card.Body>
                                        <Card.Title>{tag.name}</Card.Title>
                                        <Card.Text>{tag.definition}</Card.Text>
                                    </Card.Body>
                                    <div className="Buttons" style={{ display: "flex" }}>
                                        <div onClick={() => this.showUpdateModal(tag._id)} style={{ marginRight: "10px" }}>
                                            <FontAwesomeIcon icon={faEdit} size="1x" color="grey" className="Button" />
                                        </div>
                                        <div onClick={() => this.deleteTag(tag._id)} >
                                            <FontAwesomeIcon icon={faTrash} size="1x" color="grey" className="Button" />
                                        </div>
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
                                <Form.Control name="photo" type="file" onChange={this.handleInputChange} style={{ width: "680px" }} />
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control name="name" type="text" value={this.state.name} onChange={this.handleInputChange} style={{ width: "680px" }} />
                            </Form.Group>

                            <Form.Group controlId="definition">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control name="definition" type="text" value={this.state.definition} onChange={this.handleInputChange} style={{ width: "680px" }} />
                            </Form.Group>
                            <Button variant="dark" type="submit">Crear</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                {this.state.showUpdateModal ? <EditTag onHide={this.onHide} selectedTag={selectedTag} handleUpdateSubmit={this.handleUpdateSubmit} /> : null}
            </>
        )
    }
}

export default Tag