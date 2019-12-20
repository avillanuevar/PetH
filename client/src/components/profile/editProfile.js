import React, { Component } from "react";
import { button, Form } from "react-bootstrap";

import UserService from "../../service/Profile.service";
import FilesService from "../../service/Files.service";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this._userService = new UserService();
    this._filesService = new FilesService();
    this.state = {
      disabledbutton: false,
      buttonText: "editar perfil",
      user: {
        name: this.props.content.name,
        description: this.props.content.description,
        phone: this.props.content.phone,
        imageUrl: this.props.content.imageUrl,
        notification: this.props.content.notification,
        _id: this.props.content._id
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this._userService
      .edit(this.state.user)
      .then(x => {
        this.props.closeModalWindow();
        this.props.update(x.data);
      })
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({
      user: { ...this.state.user, [name]: value }
    });
  };

  handleFileUpload = e => {
    this.setState({ disabledbutton: true, buttonText: "Subiendo imagen..." });

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
          disabledbutton: false,
          buttonText: "Editar usuario",
          user: { ...this.state.user, imageUrl: response.data.secure_url }
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
            value={this.state.user.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={this.handleInputChange}
            value={this.state.user.description}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            onChange={this.handleInputChange}
            value={this.state.user.phone}
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
        <button
          variant="dark"
          size="sm"
          type="submit"
          disabled={this.state.disabledbutton}
        >
          {this.state.buttonText}
        </button>
      </Form>
    );
  }
}

export default EditProfile;
