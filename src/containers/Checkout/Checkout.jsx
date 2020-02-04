import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Checkout.module.css";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import { objToArr } from "../../shared/utils";

const Checkout = ({ match, history, ingr, purchased }) => {
  const checkoutCanceledHandler = () => {
    console.log("cancel");
    history.goBack();
  };

  const checkoutContinuedHandler = () => {
    history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
  if (ingr) {
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ingr}
          checkoutCancel={checkoutCanceledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        {/* <ContactData />
        <Route path={match.path + "/contact-data"} component={ContactData} /> */}
      </div>
    );
  }
  return summary;
};

const mapStateToProps = state => ({
  ingr: state.burgerBuilder.ingredients,
  purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);
