import React, { Component } from "react";
import { deleteFromCart, updateQty } from "../../actions/productAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      qty: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(item) {
    const Product = {
      name: item.name,
      price: item.price,
      desc: item.desc,
      image: item.image,
      number: this.props.auth.number.number
    };
    this.props.deleteFromCart(Product);
    window.location.reload();
  }

  //console.log(Product);
  //this.props.loginUser(userData);

  onChange(item) {
    item.qty = this.refs.qty.value;
    console.log(item);
    this.setState({ qty: this.refs.qty.value });

    this.props.updateQty(item);
  }
  render() {
    const { item } = this.props;
    return (
      <div className="ml-2">
        <div
          className="card"
          style={{
            width: "200px"
            //alignItems: "center"
          }}
        >
          <img
            className="card-img-top ml-5 mt-3"
            src={`https://storage.cloud.google.com/eraser-2bd75.appspot.com/Pencils/${
              item.image
            }?authuser=0`}
            alt="Card image cap"
            style={{
              maxWidth: "100px",
              maxHeight: "100px"
            }}
          />

          <div className="card-body" style={{}}>
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">{item.desc}</p>
            <p className="card-text">
              <b>Rs.{item.price}</b>
            </p>
            <div className="d-flex flex-rpw">
              <div className="d-flex flex-col">
                <button
                  onClick={() => this.onSubmit(item)}
                  href="#"
                  className="btn btn-danger"
                  style={{ width: "100px" }}
                >
                  Remove
                </button>
              </div>
              <div className="d-flex flex-col" style={{ margginLeft: "0" }}>
                <input
                  type="number"
                  className="form-control"
                  placeholder={item.qty}
                  min="0"
                  ref="qty"
                  name="qty"
                  onChange={() => this.onChange(item)}
                  value={this.state.qty}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteFromCart, updateQty }
)(withRouter(Cart));
