import React, { Component } from "react";
import * as firebase from "firebase";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCartItems } from "../../actions/productAction";
import Spinner from "../common/Spinner";

import Cart from "./Cart";

class CartList extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    var data = {
      number: this.props.auth.number.number
    };
    this.props.getCartItems(data);
  }

  render() {
    let CartList = 1;
    if (this.props.prod.cart == null) {
      CartList = <Spinner />;
    } else {
      if (this.props.prod.cart.length > 0) {
        CartList = this.props.prod.cart.map(item => (
          <Cart key={item.name} item={item} />
        ));
      } else {
        {
          CartList = <h4>Cart is Empty...</h4>;
        }
      }
    }
    return (
      <div className="ml-5">
        <div className=" lead jumbotron mr-5">
          <b>Cart</b>
        </div>
        <div className="row">{CartList}</div>
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
  { getCartItems }
)(withRouter(CartList));
