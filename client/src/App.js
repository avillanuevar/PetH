import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Service from './service/Auth.service'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Navbar from "./components/ui/Navbar";



class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: null }
    this._service = new Service()
  }

  setTheUser = user => {
    this.setState({ loggedInUser: user })
    console.log("El método 'setTheUser' de App.js se ha invocado, pasando al estado 'loggedInUser:", this.state.loggedInUser)
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this._service.loggedin()
        .then(theLoggedInUserFromTheServer => this.setState({ loggedInUser: theLoggedInUserFromTheServer.data }))
        .catch(err => {
          this.setState({ loggedInUser: false })
          console.log({ err })
        })
    }
  }


  render() {

    this.fetchUser()

    return (
      <>
              <Navbar loggedInUser={this.state.loggedInUser} setUser={this.setTheUser} />


        <Switch>
           <Route path="/signup" render={match => <Signup setUser={this.setTheUser} {...match} />} />
          <Route path="/login" render={match => <Login setUser={this.setTheUser} {...match} />} />
        </Switch>

      </>

    )
  }
}

export default App;
