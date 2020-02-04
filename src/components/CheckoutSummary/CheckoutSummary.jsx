import React, { useState } from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from "../Burger/Burger.component";
import Button from "../layout/UI/Button/Button";

const CheckoutSummary = ({
  ingredients,
  checkoutCancel,
  checkoutContinued
}) => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: "300px", height: "300x" }}>
      <Burger ingrs={ingredients} />
    </div>
    <Button btnType="Danger" clicked={checkoutCancel}>
      CANCEL
    </Button>
    <Button btnType="Success" clicked={checkoutContinued}>
      CONTINUE
    </Button>
  </div>
);

export default CheckoutSummary;
