import React, { Component } from "react";
import {
  saveAddressIndex,
  deleteOneAddress
} from "../../actions/productAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class AddressItem extends Component {
  saveAddress(item) {
    var data = item._id;
    this.props.saveAddressIndex(data);
  }
  deleteAddress(item) {
    var data = {
      _id: item._id
    };
    this.props.deleteOneAddress(data);
    window.location.reload();
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
                <div className="d-flex flex-row">
                  <div className="d-flex flex-col">
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
                  <div className="d-flex flex=col">
                    <a
                      style={{ height: "25%", color: "white" }}
                      onClick={() => {
                        this.deleteAddress(item);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </a>
                  </div>
                </div>
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
  { saveAddressIndex, deleteOneAddress }
)(withRouter(AddressItem));
