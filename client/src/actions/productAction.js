import { GET_PRODUCT, GET_ERROR, GET_CART } from "./types";
import axios from "axios";

export const getProducts = () => dispatch => {
  axios
    .get("/seller/pencils")
    .then(res => {
      dispatch({
        type: GET_PRODUCT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const addToCart = product => dispatch => {
  axios
    .post("/seller/addcart", product)
    .then(res => {
      //added to cart
    })
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const getCartItems = data => dispatch => {
  axios
    .post("/seller/cart", data)
    .then(res => {
      dispatch({
        type: GET_CART,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const deleteFromCart = data => dispatch => {
  axios
    .post("/seller/removefromcart", data)
    .then(res => console.log(res))
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};
