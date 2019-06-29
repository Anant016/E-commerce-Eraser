import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../../actions/authActions";
import firebase from "firebase";

class Navbar extends Component {
  onLogoutClick(e) {
    firebase
      .auth()
      .signOut()
      .then(function() {
        alert("logged out.");
      })
      .then(this.props.logOut(this.props.history))
      .catch(function(error) {
        // An error happened.
      });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
      <ul className="navbar-nav text-right ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav text-right ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/cart">
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/myorders">
            My Orders
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <div>
        <nav
          className="navbar shadow navbar-expand-sm navbar-light black
        mb-4"
        >
          <div className="container mb-2 mt-1">
            <Link className="navbar-brand ml-5" to="/">
              <b>Eraser</b>
            </Link>
            <button
              value="toggle"
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOut }
)(Navbar);
