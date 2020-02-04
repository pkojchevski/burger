import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "./components/layout/Layout.component";
import BurgerBuilder from "./containers/BurgerBuilders/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import OrderComponent from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import classes from "./App.module.css";

const App = ({ onTryAutoSignUp, isAuth, purchased }) => {
  useEffect(() => {
    onTryAutoSignUp();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" exact component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (isAuth) {
    routes = (
      <Switch>
        {/* <Route path="/checkout" exact component={Checkout} /> */}
        <Route path="/orders" exact component={OrderComponent} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div className={classes.App}>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null,
  purchased: state.order.purchased
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
