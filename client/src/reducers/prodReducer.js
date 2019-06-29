import { GET_PRODUCT } from "../actions/types";

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

    default:
      return state;
  }
}
