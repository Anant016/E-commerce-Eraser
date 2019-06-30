import React, { Component } from "react";
import { saveAddressIndex } from "../../actions/productAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class AddressItem extends Component {
  saveAddress(item) {
    var data = item._id;
    this.props.saveAddressIndex(data);
  }
  render() {
    const { item } = this.props;
    return (
      <div className="">
        <div className="d-flex flex-row">
          <div className="d-fle flex-col mt-5">
            <input
              type="radio"
              name="address"
              value={item._id}
              className="align-middle mt-5 mr-1 "
              onClick={() => {
                this.saveAddress(item);
              }}
            />
          </div>
          <div className="d-fle flex-col">
            <div className="card " id={item._id}>
              <div className="card-body  ">
                {item.name}
                <br />
                {item.address}
                <br />
                {item.landmark}
                <br />
                {item.pincode}
                <br />
                {item.number}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { saveAddressIndex }
)(withRouter(AddressItem));
