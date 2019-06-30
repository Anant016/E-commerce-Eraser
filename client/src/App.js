import React, { Component } from "react";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOut } from "./actions/authActions";
import jwt_decode from "jwt-decode";

import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import * as firebase from "firebase";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/common/Navbar";
import Login from "./components/Login";

import PrivateRoute from "./components/common/PrivateRoute";
import Order from "./components/Order";
import ProductList from "./components/Products/ProductList";
import Drawer from "./components/common/Drawer";
import CartList from "./components/Cart/CartList";

firebase.initializeApp({
  apiKey: "AIzaSyBxZHyhn7J3pfgoK5V2tEL04tOQTg0WnQw",
  authDomain: "eraser-2bd75.firebaseapp.com",
  databaseURL: "https://eraser-2bd75.firebaseio.com",
  projectId: "eraser-2bd75",
  storageBucket: "eraser-2bd75.appspot.com",
  messagingSenderId: "984030785264"
});

//Check for Token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token to get user
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check if token is expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logOut());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Drawer />
            <main style={{ flexGrow: "1" }} className="ml-5">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "0 8px"
                }}
              />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/cart" component={CartList} />
                <PrivateRoute exact path="/my-orders" component={Order} />
              </Switch>
              <Route exact path="/" component={ProductList} />
            </main>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
