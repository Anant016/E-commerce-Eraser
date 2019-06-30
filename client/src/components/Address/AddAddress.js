import React, { Component } from "react";
import { node } from "prop-types";

import { connect } from "react-redux";
import { addAddress } from "../../actions/productAction";
import { withRouter } from "react-router-dom";

class AddAddress extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      address: "",
      landmark: "",
      pincode: "",
      number: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit() {
    var Address = {
      name: this.state.name,
      address: this.state.address,
      landmark: this.state.landmark,
      pincode: this.state.pincode,
      number: this.props.auth.number
    };
    this.props.addAddress(Address, this.props.history);
  }

  render() {
    return (
      <div className="ml-5 mr-5">
        <div className="jumbotron lead">
          <b>Add Address</b>
        </div>
        <form
          style={{
            border: "0px",
            backgroundColor: "white",
            borderColor: "white"
          }}
          onSubmit={this.onSubmit}
        >
          <input
            required
            type="text"
            placeholder="Full Name "
            style={{ maxWidth: "200px" }}
            onChange={this.onChange}
            className="form-control mt-2"
            name="name"
          />
          <textarea
            required
            row="3"
            type="textarea"
            name="address"
            className="form-control mt-2"
            placeholder="Full Address"
            style={{ maxWidth: "400px" }}
            onChange={this.onChange}
          />
          <input
            required
            type="text"
            placeholder="Landmark"
            style={{ maxWidth: "200px" }}
            onChange={this.onChange}
            className="form-control mt-2"
            name="landmark"
          />
          <input
            required
            type="number"
            placeholder="Pincode"
            style={{ maxWidth: "200px" }}
            onChange={this.onChange}
            className="remove form-control mt-2 mb-3"
            name="pincode"
          />
          <button type="submit" className="btn btn-success">
            Confirm
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addAddress }
)(withRouter(AddAddress));
