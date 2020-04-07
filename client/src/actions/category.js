import {
  GET_CATEGORIES,
  CATEGORY_ERROR,
  GET_POSTS,
  DELETE_CATEGORY,
  GET_CATEGORY
} from '../actions/types';
import axios from 'axios';
import { setAlert } from './alert';

//get all cats
export const getCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/categories');
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// get category by id
export const getCategory = id => async dispatch => {
  try {
    const res = await axios.get(`/api/categories/${id}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete category
export const deleteCategory = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/categories/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: id
    });
    dispatch(setAlert('Category removed', 'success'));
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Create category
export const createCategory = formData => async dispatch => {
  try {
    const res = await axios.post('/api/categories', formData);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
    dispatch(setAlert('Category added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CATEGORY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
