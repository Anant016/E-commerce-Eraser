import {
  GET_PRODUCT,
  GET_CART,
  GET_ADDRESS,
  SAVE_ADDRESS_INDEX,
  GET_ORDER
} from "../actions/types";

const initialState = {
  pencils: null,
  cart: null,
  address: null,
  addressIndex: null,
  orders: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        pencils: action.payload,
        addressIndex: null
      };
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
        addressIndex: null
      };
    case GET_ADDRESS:
      return {
        ...state,
        address: action.payload,
        addressIndex: null
      };
    case SAVE_ADDRESS_INDEX:
      // console.log("reached");
      return {
        ...state,
        addressIndex: action.payload
      };
    case GET_ORDER:
      return {
        ...state,
        orders: action.payload,
        addressIndex: null
      };

    default:
      return state;
  }
}
