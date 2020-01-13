import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Service from "./service/Auth.service";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Navbar from "./components/ui/Navbar";
import Profile from "./components/profile/profile";
import MyPets from "./components/pets/myPets";
import petDetails from "./components/pets/petDetails";
import MyHome from "./components/host/myHome";
import Home from './components/ui/Home'
import ReservationDetails from "./components/reservations/reservationDetails";
import Reservations from "./components/reservations/myReservation";
import RequestDetails from "./components/request/requestDetail";

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

          <Route
            exact path="/reservationDetails/:id"
            render={match => <ReservationDetails {...match} loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} />}
          />
          <Route path="/requestDetail/:id" component={RequestDetails} />

          <Route
            exact path="/reservations"
            render={() => <Reservations loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser}/>}
          />
        </Switch>
      </>
    );
  }
}

export default App;
