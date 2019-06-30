import {
  GET_PRODUCT,
  GET_CART,
  GET_ADDRESS,
  SAVE_ADDRESS_INDEX
} from "../actions/types";

const initialState = {
  pencils: null,
  cart: null,
  address: null,
  addressIndex: ""
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
    case GET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case SAVE_ADDRESS_INDEX:
      console.log("reached");
      return {
        ...state,
        addressIndex: action.payload
      };

    default:
      return state;
  }
}
