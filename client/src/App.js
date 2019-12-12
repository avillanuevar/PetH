import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Service from "./service/Auth.service";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/ui/Navbar";
import Profile from "./components/profile/profile";
import MyPets from "./components/pets/myPets";
import petDetails from './components/pets/petDetails';

class App extends Component {
  constructor() {
    super();
    this.state = { loggedInUser: null };
    this._service = new Service();
  }

  setTheUser = user => {
    this.setState({ loggedInUser: user });
  };

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this._service
        .loggedin()
        .then(theLoggedInUserFromTheServer => {
          this.setState({ loggedInUser: theLoggedInUserFromTheServer.data });
        })
        .catch(err => {
          this.setState({ loggedInUser: false });
          console.log({ err });
        });
    }
  };

  render() {
    this.fetchUser();

    return (
      <>
        <Navbar
          loggedInUser={this.state.loggedInUser}
          setUser={this.setTheUser}
        />

        <Switch>
          <Route
            path="/signup"
            render={match => <Signup setUser={this.setTheUser} {...match} />}
          />
          <Route
            path="/login"
            render={match => <Login setUser={this.setTheUser} {...match} />}
          />
        
          <Route
            exact path="/profile"
            render={() => <Profile loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser}/>}
          />

          <Route
            exact path="/myPets"
            render={() => <MyPets loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} />}
          />
          <Route path="/petDetails/:id" component={petDetails} />

        </Switch>
      </>
    );
  }
}

export default App;
