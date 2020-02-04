import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurger = (orderData, token) => dispatch => {
  dispatch(purchaseBurgerStart());
  axios
    .post("/orders.json?auth=" + token, orderData)
    .then(response => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch(error => dispatch(purchaseBurgerFail(error)));
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error: error
});

export const fetchOrdersStart = error => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => dispatch => {
  dispatch(fetchOrdersStart());
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  axios
    .get("/orders.json" + queryParams)
    .then(res => {
      let fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => dispatch(fetchOrdersFail(err)));
};
