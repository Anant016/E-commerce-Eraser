import React, { Component } from "react";
import { node } from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  addAddress,
  getAddresses,
  addToOrder
} from "../../actions/productAction";
import { withRouter } from "react-router-dom";
import AddressItem from "./AddressItem.js";

class Address extends Component {
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

  componentWillMount() {
    var data = {
      number: this.props.auth.number
    };
    this.props.getAddresses(data);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(item) {
    var Order = {
      _id: this.props.prod.addressIndex,
      number: this.props.auth.number
    };
    this.props.addToOrder(Order);
  }

  render() {
    let AddressList = "";
    if (this.props.prod.address == null) {
      AddressList = "";
    } else {
      AddressList = this.props.prod.address.map(item => (
        <AddressItem key={item.name} item={item} />
      ));
    }

    return (
      <div className="ml-5 mr-5">
        <form
          style={{
            border: "0px",
            backgroundColor: "white",
            borderColor: "white"
          }}
          onSubmit={this.onSubmit}
        >
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-12">
              <div className="jumbotron lead">
                <b>Address</b>
              </div>
              {/* Get Address */}
              {AddressList}
              {/* Add Address Button */}
              <Link className="btn btn-info mt-3 ml-3" to="/addaddress">
                Add Address
              </Link>
            </div>
            {/* SELECT PAYMENT METHOD */}
            <div className="col-sm-12 col-md-6 col-lg-6 col-12">
              <div className="jumbotron lead">
                <b>Select Payment method</b>
              </div>
              <a
                className="btn btn-success ml-5 mt-3"
                style={{ color: "white" }}
              >
                Cash
              </a>
            </div>
          </div>
          {/* CONFIRM BUTTON */}
          {this.props.prod.addressIndex ? (
            <div style={{ textAlign: "center", color: "white" }}>
              <button type="submit" className="btn btn-success">
                Confirm
              </button>
            </div>
          ) : (
            <div />
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  prod: state.prod
});

export default connect(
  mapStateToProps,
  { addAddress, getAddresses, addToOrder }
)(withRouter(Address));
