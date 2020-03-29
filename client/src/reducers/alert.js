import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

export default function(state = initialState, action) {
  // actions payload will return type always and payload
  const { type, payload } = action;
  //evaluate the types
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload); // return all alert except the one matches the payload
    default:
      return state;
  }
}
