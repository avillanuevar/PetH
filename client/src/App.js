import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Service from "./service/Auth.service";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/ui/Navbar";
import Profile from "./components/profile/profile";
import MyPets from "./components/pets/myPets";
import petDetails from "./components/pets/petDetails";
import MyHome from "./components/host/myHome";
import Home from './components/ui/Home'
import ReservationDetails from './components/reservations/reservationDetails'

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
          <Route exact path="/" component={Home} />
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
          <Route
            exact path="/myHome"
            render={() => <MyHome loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} />}
          />
          <Route path="/reservationDetails/:id" component={ReservationDetails} />

        </Switch>
      </>
    );
  }
}

export default App;
