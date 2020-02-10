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
import { useTransition, animated, config } from "react-spring";
import useRouter from "./hoc/useRouter";

const App = ({ onTryAutoSignUp, isAuth, purchased }) => {
  useEffect(() => {
    onTryAutoSignUp();
  }, []);
  const { location } = useRouter();
  const transition = useTransition(location, location => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  // let routes =
  // {transition.map(({item, props, key}) => (
  //     <animated.div key={key} style={props}>
  //       <Switch location={item}>
  //        <Route path="/auth" exact component={Auth} />
  //        <Route path="/" exact component={BurgerBuilder} />
  //        <Redirect to="/" />
  //       </Switch>
  //     </animated.div>
  //   ))};
  // <Switch>
  //   <Route path="/auth" exact component={Auth} />
  //   <Route path="/" exact component={BurgerBuilder} />
  //   <Redirect to="/" />
  // </Switch>

  // if (isAuth) {
  //   routes = (
  //     <Switch>
  //       {/* <Route path="/checkout" exact component={Checkout} /> */}
  //       <Route path="/orders" exact component={OrderComponent} />
  //       <Route path="/logout" exact component={Logout} />
  //       <Route path="/auth" exact component={Auth} />
  //       <Route path="/" exact component={BurgerBuilder} />
  //       <Redirect to="/" />
  //     </Switch>
  //   );
  // }
  return (
    <div className={classes.App}>
      <Layout>
        {!isAuth
          ? transition.map(({ item, props, key }) => (
              <animated.div key={key} style={props}>
                <Switch location={item}>
                  <Route path="/auth" exact component={Auth} />
                  <Route path="/" exact component={BurgerBuilder} />
                  <Redirect to="/" />
                </Switch>
              </animated.div>
            ))
          : transition.map(({ item, props, key }) => (
              <animated.div key={key} style={props}>
                <Switch location={item}>
                  {/* <Route path="/checkout" exact component={Checkout} /> */}
                  <Route path="/orders" exact component={OrderComponent} />
                  <Route path="/logout" exact component={Logout} />
                  <Route path="/auth" exact component={Auth} />
                  <Route path="/" exact component={BurgerBuilder} />
                  <Redirect to="/" />
                </Switch>
              </animated.div>
            ))}
        ;
      </Layout>
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
