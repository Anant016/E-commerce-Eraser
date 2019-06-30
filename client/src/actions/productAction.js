import {
  GET_PRODUCT,
  GET_ERROR,
  GET_CART,
  GET_ADDRESS,
  SAVE_ADDRESS_INDEX
} from "./types";
import axios from "axios";

//get all products
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

//add to cart
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

//get Cart items
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

export const updateQty = item => dispatch => {
  axios
    .post("/seller/updateQty", item)
    .then(res => console.log(res))
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const addAddress = (item, history) => dispatch => {
  axios
    .post("/seller/addAddress", item)
    .then(res => {
      console.log(res);
      history.push("/address");
    })
    .catch(err =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

export const getAddresses = data => dispatch => {
  axios
    .post("/seller/getaddresses", data)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_ADDRESS,
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

export const saveAddressIndex = data => {
  console.log(data);
  return {
    type: SAVE_ADDRESS_INDEX,
    payload: data
  };
};
