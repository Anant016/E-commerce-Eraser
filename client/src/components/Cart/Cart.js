import React, { Component } from "react";
import { deleteFromCart } from "../../actions/productAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
  { deleteFromCart }
)(withRouter(Cart));
