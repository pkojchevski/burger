import React, { useEffect } from "react";

import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import Spinner from "../../components/layout/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./Orders.module.css";

const Orders = ({ loading, orders, onFetchOrders }) => {
  useEffect(() => {
    onFetchOrders(
      localStorage.getItem("token"),
      localStorage.getItem("userId")
    );
  }, []);
  return (
    <div className={classes.AbsoluteWraper}>
      <div className={classes.Orders}>
        <div>
          {orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
