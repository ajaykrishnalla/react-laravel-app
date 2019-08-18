import {
  LOGIN_SUCCESS,
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR
} from "../actions/types";

const intialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null
};

export default (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        user: null
      };
    }
    default:
      return state;
  }
};
