import React from "react";
import Wrapper from "../../../hoc/Wrapper";

import Button from "../../layout/UI/Button/Button";
import classes from "./OrderSummary.module.css";

const OrderSummary = ({
  ingredients,
  purchaseContinued,
  purchaseCanceled,
  price
}) => {
  const ingredientsSummary = ingredients
    ? ingredients.map(ingredient => (
        <li key={ingredient}>
          <span style={{ textTransform: "capitalize" }}>
            {ingredient.name} {ingredient.price} {ingredient.quantity}
          </span>
        </li>
      ))
    : null;
  return (
    <Wrapper>
      <div className={classes.OrderSummary}>
        <h2 className={classes.title}>Your Order</h2>
        <ul>
          {!ingredients
            ? null
            : ingredients.map((ingredient, index) => (
                <li key={index}>
                  <div style={{ textTransform: "capitalize" }}>
                    {ingredient.name}
                  </div>
                  <div>{ingredient.quantity} pcs.</div>
                  <div>{ingredient.price}&euro;</div>
                </li>
              ))}
        </ul>
        <hr></hr>
        <h1 className={classes.price}>
          Total Price
          <span>
            <strong>{price.toFixed(2)} &euro;</strong>
          </span>
        </h1>
        <div className={classes.buttons}>
          <button
            className={[classes.button, classes.red].join(" ")}
            onClick={purchaseCanceled}
          >
            CANCEL
          </button>
          <button
            className={[classes.button, classes.green].join(" ")}
            onClick={purchaseContinued}
          >
            ORDER
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderSummary;
