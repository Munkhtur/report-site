import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid/v4';

// to dispatch more than one action types from this function
// you add DISPATCH into the function
// this is possible because of the THUNK middleware we installed
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
