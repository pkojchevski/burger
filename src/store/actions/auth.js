import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = authData => {
  console.log(authData);
  return { type: actionTypes.AUTH_SUCCESS, payload: authData };
};

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.LOGOUT
  };
};

export const checkAuthTimeout = expTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFlSfr96uzPe0K4gZaB1DbqvTyKET5w78";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFlSfr96uzPe0K4gZaB1DbqvTyKET5w78";
    }
    axios
      .post(url, authData)
      .then(res => {
        localStorage.setItem("token", res.data.idToken);
        const expDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("expirationTime", expDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(
          authSuccess({ token: res.data.idToken, userId: res.data.localId })
        );
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        console.log("err:", err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem("token");
  const expTime = new Date(localStorage.getItem("expirationTime"));
  if (!token) {
    dispatch(logout());
  } else {
    if (expTime > new Date()) {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess({ token, userId }));
      dispatch(
        checkAuthTimeout((expTime.getTime() - new Date().getTime()) / 1000)
      );
    } else {
      dispatch(logout());
    }
  }
};

export const setOrderAfterLoginFail = () => ({
  type: actionTypes.ORDER_AFTER_LOGIN_FAIL
});

export const setOrderAfterLoginTrue = () => ({
  type: actionTypes.ORDER_AFTER_LOGIN_TRUE
});
