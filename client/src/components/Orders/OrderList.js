import React, { Component } from "react";
import * as firebase from "firebase";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getOrderItems } from "../../actions/productAction";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

import Order from "./Order";

class OrderList extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    var data = {
      number: this.props.auth.number
    };
    this.props.getOrderItems(data);
  }

  render() {
    let OrderList = "";
    if (this.props.prod.orders == null) {
      OrderList = <Spinner />;
    } else {
      if (this.props.prod.orders) {
        OrderList = this.props.prod.orders.map(order => (
          <Order key={order._id} order={order} />
        ));
      } else {
        OrderList = <h4>No previous orders present...</h4>;
      }
    }

    return (
      <div className="ml-5">
        <div className=" lead jumbotron mr-5">
          <b>My Orders</b>
        </div>
        <div className="row ml-2">{OrderList}</div>
        <br />
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
  { getOrderItems }
)(withRouter(OrderList));
