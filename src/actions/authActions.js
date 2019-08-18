import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  REGISTER_SUCCESS,
  AUTH_ERROR
} from "./types";
import SetAuthToken from "../utils/SetAuthToken";
export const registerUser = data => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/register", data, config);
    console.log(res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.success
    });
  } catch (err) {
    console.log("test");
    console.error(err.response.data.errors.name[0]);
  }
};

export const loginUser = data => async dispatch => {
  try {
    const config = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    let res = await axios.post("/api/login", data, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.succeess
    });
    dispatch(loadUser());
    // userloaded();
  } catch (err) {
    console.error(err);
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }
  try {
    let res = await axios.get("/api/user");
    let data = await res.data;
    dispatch({
      type: USER_LOADED,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
