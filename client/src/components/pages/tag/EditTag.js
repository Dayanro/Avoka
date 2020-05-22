import React, { Component } from 'react'
import './Tag.css'

import TagService from '../../../service/tag.service'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'



class EditTag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.selectedTag.name,
            definition: this.props.selectedTag.definition,
            photo: this.props.selectedTag.photo,
        }
        this.tagService = new TagService()
    }

    handleInputChange = e => {
        const value = e.target.type === "file" ? e.target.files[0] : e.target.value
        this.setState({ [e.target.name]: value })
    }

    render() {
        return (
            <>
                <Modal
                    size="lg"
                    show={true}
                    onHide={this.props.onHide}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Editar Tag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => this.props.handleUpdateSubmit(e, this.props.selectedTag._id, this.state.name, this.state.photo, this.state.definition)}>
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
                            <Button variant="dark" type="submit">Actualizar</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}

export default EditTag