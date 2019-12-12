import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'

import PetService from '../../service/Pet.service'
import FilesService from '../../service/Files.service'

class PetForm extends Component {

    constructor(props) {
        super(props)
        this._petService = new PetService()
        this._filesService = new FilesService()
        this.state = {
            disabledButton: false,
            buttonText: 'Add your pet',
            pet: {
                name: '',
                age: 0,
                description: '',
                careDetails: '',
                agresiveWithAnimals: false,
                agresiveWithPeople: false, 
                imageUrl:''
            }
            }
        }
    

    handleSubmit = e => {
        e.preventDefault()
        this._petService.create(this.state.pet)
            .then(x => {
                this.props.closeModalWindow()
                this.props.update()
            })
            .catch(err => console.log(err))
    }


    handleInputChange = e => {
        let { name, value } = e.target
        if (name == 'agresiveWithAnimals' || name == 'agresiveWithPeople') value = e.target.checked
        this.setState({
            pet: { ...this.state.pet, [name]: value }
        })
    }

    handleFileUpload = e => {
        this.setState({ disabledButton: true, buttonText: 'Subiendo imagen...' })

        const uploadData = new FormData()
        uploadData.append("imageUrl", e.target.files[0])
        this._filesService.handleUpload(uploadData)
            .then(response => {
                console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.data.secure_url)
                this.setState({
                    disabledButton: false,
                    buttonText: 'Add ypur pet',
                    pet: { ...this.state.pet, imageUrl: response.data.secure_url }
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>picture</Form.Label>
                    <Form.Control name="imageUrl" type="file" onChange={this.handleFileUpload} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={this.handleInputChange} value={this.state.pet.name} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" name="age" onChange={this.handleInputChange} value={this.state.pet.age} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" onChange={this.handleInputChange} value={this.state.pet.description} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Care Details</Form.Label>
                    <Form.Control type="text" name="careDetails" onChange={this.handleInputChange} value={this.state.pet.careDetails} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Is he Agresive with other pets?</Form.Label>
                    <Form.Control type="checkbox" name="agresiveWithAnimals" onChange={this.handleInputChange} checked={this.state.pet.agresiveWithAnimals} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Is he Agresive with people?</Form.Label>
                    <Form.Control type="checkbox" name="agresiveWithPeople" onChange={this.handleInputChange} checked={this.state.pet.agresiveWithPeople} />
                </Form.Group>
                <Button variant="dark" size="sm" type="submit" disabled={this.state.disabledButton}>{this.state.buttonText}</Button>
            </Form>
        )
    }
}


export default PetForm