import axios from "axios";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productAction";
import Spinner from "../common/Spinner";
import Product from "./Product";

class Products extends Component {
  componentWillMount() {
    //firebase
    this.props.getProducts();
  }
  render() {
    let ProductList = 1;
    if (this.props.prod.pencils == null) {
      ProductList = <Spinner />;
    } else {
      if (this.props.prod.pencils.length > 0) {
        ProductList = this.props.prod.pencils.map(item => (
          <Product key={item.name} item={item} />
        ));
      } else {
        {
          ProductList = <h4>No products found...</h4>;
        }
      }
    }

    return (
      <div className="ml-5 mr-5">
        <div className="lead jumbotron">
          <b>Products</b>
        </div>
        <br />
        <div className="row">{ProductList}</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  prod: state.prod
});

export default connect(
  mapStateToProps,
  { getProducts }
)(Products);
