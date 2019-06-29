/*eslint-disable */
import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { loginUser, addError } from "../actions/authActions";
import { Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Login extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/cart");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/cart");
    }

    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }
  }
  constructor() {
    super();
    this.state = {
      number: "",
      otpSent: false,
      code: "",
      errors: ""
    };
    this.onChange = this.onChange.bind(this);
    this.sendOtp = this.sendOtp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  sendOtp() {
    this.setState({ errors: "" });
    firebase.auth().useDeviceLanguage();
    var a = document.getElementById("a");
    var appVerifier = new firebase.auth.RecaptchaVerifier(a, {
      size: "invisible",
      callback: function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });

    if (this.state.number.length == 10) {
      document.getElementById("login_btn").classList = "btn";
      firebase
        .auth()
        .signInWithPhoneNumber("+91" + this.state.number, appVerifier)
        .then(function(confirmationResult) {
          console.log("otp sent");
          window.sent = true;
          window.confirmationResult = confirmationResult;

          console.log(confirmationResult);
        })
        .catch(error => {
          console.log(error);
          this.setState({ errors: "Please Reload the page." });
          this.props.addError(error);
        });
    } else {
      this.setState({ errors: "Enter Valid Number." });
    }
  }

  signIn() {
    this.setState({ errors: "" });
    confirmationResult
      .confirm(this.state.code)
      .then(function(result) {
        //
        // User signed in successfully.
        var user = result.user;
        console.log(user);
      })
      //this.props.history.push('/cart')
      .then(() => {
        this.props.loginUser("+91" + this.state.number, this.props.history);
      })
      .catch(error => {
        this.setState({ errors: "Otp entered is incorrect." });
        this.props.addError(error);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="ml-5 mt-5 mr-5">
        <div className="row">
          <div className=" col-12 col-lg-6 col-md-6 col-sm-12 col mb-5">
            <div style={{ color: "red", fontWeight: "bold" }} className="lead">
              {" "}
              {this.state.errors}
            </div>

            <div id="form1" className="d-flex flex-row mb-3">
              <input
                style={{ maxWidth: "250px" }}
                type="telephone"
                name="number"
                className="form-control"
                value={this.state.number}
                onChange={this.onChange}
                placeholder="Mobile No."
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "cornflowerblue",
                  color: "white",
                  width: "150px"
                }}
                className="btn"
                id="a"
                onClick={this.sendOtp}
              >
                Send Otp
              </button>
            </div>
            <br />
            <div id="form2" className="d-flex flex-row dnone">
              <input
                type="text"
                name="code"
                style={{ maxWidth: "250px" }}
                className="form-control"
                value={this.state.code}
                onChange={this.onChange}
                placeholder="OTP"
              />
              <button
                className="btn dnone"
                style={{
                  backgroundColor: "cornflowerblue",
                  color: "white",
                  width: "150px"
                }}
                type="submit"
                id="login_btn"
                onClick={this.signIn}
              >
                Login
              </button>
            </div>
          </div>
          {/* Col1End */}
          <div className="col-12 col-lg-6 col-md-6 col-sm-12 col">
            <img src="./img/poster.jpg" style={{ width: "400px" }} />
          </div>
          {/* col2 Ends */}
        </div>
        {/* Row End */}
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addError: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser, addError }
)(withRouter(Login));
