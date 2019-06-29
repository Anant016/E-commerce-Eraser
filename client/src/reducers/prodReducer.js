import { GET_PRODUCT, GET_CART } from "../actions/types";

const initialState = {
  pencils: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        pencils: action.payload
      };
    case GET_CART:
      return {
        ...state,
        cart: action.payload
      };

    default:
      return state;
  }
}
