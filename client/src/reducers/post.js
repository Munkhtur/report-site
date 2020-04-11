import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  GET_POST,
  ADD_POSTCAT,
} from '../actions/types';

const initialState = {
  posts: [],
  post: {},
  error: {},
  loading: true,
  size: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        size: payload.length,
      };
    case GET_POST:
    case ADD_POSTCAT:
      return {
        ...state,
        post: payload,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
