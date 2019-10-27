import React, { Component } from "react";
import Third from "./Third";
import Spinner from "../common/Spinner";

export default class Order extends Component {
  render() {
    const { order } = this.props;
    // console.log(order);
    var orderid=order._id.slice(19,order._id.length);
    let Order = "";
    if (order.items == null) {
      Order = <Spinner />;
    } else {
      if (order.items.length > 0) {
        Order = order.items.map(t => <Third key={t.name} t={t} />);
      } else {
        Order = <h4>No previous orders present...</h4>;
      }
    }
    return (
      <div className="ml-5 mr-5">
        <div className="card">
          <div className="card-body">
          <div><b>Order Id: </b>{orderid}</div>
          <hr/>
          {Order}
          <b>Total Price:</b> Rs {order.totalPrice}
          </div>
        </div>
      </div>
    );
  }
}
