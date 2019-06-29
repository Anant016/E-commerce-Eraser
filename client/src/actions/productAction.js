import { GET_PRODUCT, GET_ERROR } from "./types";
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
