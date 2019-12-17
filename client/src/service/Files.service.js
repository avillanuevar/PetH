import axios from "axios";

export default class Services {
  constructor() {
    this._service = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true // RUTAS PERSISTENTES
    });
  }

  handleUpload = theFile => {

    return this._service.post("/files/upload", theFile);
  };
}
