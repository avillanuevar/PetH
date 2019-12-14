import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import PetService from "../../service/Pet.service";
import FilesService from "../../service/Files.service";

class EditPet extends Component {
    constructor(props) {
        super(props);
        this._petService = new PetService();
        this._filesService = new FilesService();
        this.state = {
            disabledButton: false,
            buttonText: "editar perfil",
            pet: {}
            
        };
    }
    componentDidMount = () => {
        const petId = this.props.id
        this._petService
            .details(petId)
            .then(thePet => this.setState({ pet: thePet.data }))
            .catch(err => console.log(err));
    };
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.pet)
        this._petService
            .edit(this.state.pet)
            .then(x => {
                this.props.closeModalWindow();
                this.props.update();
            })
            .catch(err => console.log(err));
    };

    handleInputChange = e => {
        let { name, value } = e.target;
        this.setState({
            pet: { ...this.state.pet, [name]: value }
        });
    };

    handleFileUpload = e => {
        this.setState({ disabledButton: true, buttonText: "Subiendo imagen..." });

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        this._filesService
            .handleUpload(uploadData)
            .then(response => {
                console.log(
                    "Subida de archivo finalizada! La URL de Cloudinray es: ",
                    response.data.secure_url
                );
                this.setState({
                    disabledButton: false,
                    buttonText: "Editar usuario",
                    pet: { ...this.state.pet, imageUrl: response.data.secure_url }
                });
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        onChange={this.handleInputChange}
                        value={this.state.pet.name}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        onChange={this.handleInputChange}
                        value={this.state.pet.description}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        onChange={this.handleInputChange}
                        value={this.state.pet.phone}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Imagen URL (archivo)</Form.Label>
                    <Form.Control
                        name="imageUrl"
                        type="file"
                        onChange={this.handleFileUpload}
                    />
                </Form.Group>
                <Button
                    variant="dark"
                    size="sm"
                    type="submit"
                    disabled={this.state.disabledButton}
                >
                    {this.state.buttonText}
                </Button>
            </Form>
        );
    }
}

export default EditPet;