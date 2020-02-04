import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
  orderAfterLogin: false
};

const authReducer = (state = initialState, action) => {
  // console.log("action:", action.token);
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        userId: action.payload.userId
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        orderAfterLogin: false
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      };
    case actionTypes.ORDER_AFTER_LOGIN_FAIL:
      return {
        ...state,
        orderAfterLogin: false
      };
    case actionTypes.ORDER_AFTER_LOGIN_TRUE:
      return {
        ...state,
        orderAfterLogin: true
      };

    default:
      return state;
  }
};

export default authReducer;
