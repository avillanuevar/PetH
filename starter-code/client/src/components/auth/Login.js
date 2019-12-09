import React, { Component } from 'react'

import Service from '../../service/Auth.service'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            showToast: false,
            toastText: '',
            user: { username: '', password: '' }
        }
    }


    handleInputChange = e => {
        let { name, value } = e.target
        this.setState({
            user: { ...this.state.user, [name]: value }
        })
    }


    handleSubmit = e => {
        e.preventDefault()
        const { username, password } = this.state.user
        this._service.login(username, password)
            .then(theLoggedUser => {
                this.props.setUser(theLoggedUser.data)
                this.setState({ username: '', password: '' })
                this.props.history.push('/')            // REDIRECCIONAMIENTO
            })
            .catch(err => {
                this.handleToastOpen(err.response.data.message)
            })
    }

    handleToastClose = () => this.setState({ showToast: false, toastText: '' })
    handleToastOpen = text => this.setState({ showToast: true, toastText: text })


    render() {
        return (
            <>

                <h1>Iniciar sesión</h1>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Usuario</label>
                        <input type="text" name="username" onChange={this.handleInputChange} value={this.state.username} />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password} />
                    </div>
                    <button  type="submit">Iniciar sesión</button>
                </form>

            </>
        )
    }
}


export default LoginForm