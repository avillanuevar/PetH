import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import HostService from "../../service/Host.service";
import FilesService from "../../service/Files.service";

class HomeForm extends Component {
  constructor(props) {
    super(props);
    this._hostService = new HostService();
    this._filesService = new FilesService();
    this.state = {
      disabledButton: false,
      buttonText: "Add your home",
      home: {
        title:'',
        imageUrl:'',
        street:'',
        postalCode:0,
        city:'',
        country:'',
        home:'',
        standardPrice:15,
        petGrooming:false
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this._hostService
      .create(this.state.home)
      .then(x => {
        this.props.closeModalWindow();
        this.props.update();
        this.props.setTheUser(x.data.user);
      })
      .catch(err => console.log(err));
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    if (name == "petGrooming")
      value = e.target.checked;
    this.setState({
      home: { ...this.state.home, [name]: value }
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
          buttonText: "Add ypur home",
          home: { ...this.state.home, imageUrl: response.data.secure_url }
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Imagen URL (archivo)</Form.Label>
          <Form.Control
            name="imageUrl"
            type="file"
            onChange={this.handleFileUpload}
          />
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={this.handleInputChange}
              value={this.state.home.title}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              onChange={this.handleInputChange}
              value={this.state.home.street}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="number"
              name="postalCode"
              onChange={this.handleInputChange}
              value={this.state.home.postalCode}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              onChange={this.handleInputChange}
              value={this.state.home.city}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              onChange={this.handleInputChange}
              value={this.state.home.country}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type of residency</Form.Label>
            <Form.Control
              as="select"
              name="home"
              onChange={this.handleInputChange}
              value={this.state.home.home}
            >
              <option>Apartment</option>
              <option>House</option>
            </Form.Control>
          </Form.Group>
        </Form.Group>
        <Form.Group>
          <Form.Label>Gruming services</Form.Label>
          <Form.Control
            name="petGrooming"
            type="checkbox"
            onChange={this.handleInputChange}
            checked={this.state.home.petGrooming}
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

export default HomeForm;
