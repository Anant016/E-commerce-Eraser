import React, { Component } from "react";
import { Link } from "react-router-dom";

import { addToCart } from "../../actions/productAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      qty: "1",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(item) {
    if (
      this.props.auth.number == null ||
      this.props.auth.number == undefined ||
      this.props.auth.number == ""
    ) {
      alert("Please Login");
    } else {
      const Product = {
        qty: this.state.qty,
        name: item.name,
        price: item.price,
        desc: item.desc,
        image: item.image,
        number: this.props.auth.number
      };
      console.log(Product);
      this.props.addToCart(Product);
      alert("added to cart");
    }

    //console.log(Product);
    //this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { item } = this.props;
    const { auth } = this.props;
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
                  className="btn btn-primary"
                  style={{ width: "100px" }}
                >
                  Buy
                </button>
              </div>
              <div className="d-flex flex-col" style={{ margginLeft: "0" }}>
                <input
                  type="number"
                  className="form-control"
                  placeholder="1"
                  min="1"
                  name="qty"
                  onChange={this.onChange}
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
  { addToCart }
)(withRouter(Product));
