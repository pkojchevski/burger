import React from "react";

import classes from "./BuildControls.module.css";

import BuildControl from "./BuildControl/BuildControl.component";
import Button from "../../layout/UI/Button/Button";

const BuildControls = ({
  addIngredient,
  removeIngredient,
  disabled,
  ingrs,
  purchasable,
  purchase,
  isAuth
}) => {
  return (
    <div className={classes.BuildControls}>
      {ingrs.map((ingredient, index) => (
        <BuildControl
          key={index}
          label={ingredient.name}
          price={ingredient.price}
          quantity={ingredient.quantity}
          added={() => addIngredient(ingredient)}
          removed={() => removeIngredient(ingredient)}
        />
      ))}
      <Button
        className={classes.OrderButton}
        disabled={!purchasable}
        clicked={purchase}
        btnColor="btnYellow"
        colorOutline="redOutline"
      >
        {isAuth ? "ORDER NOW" : "SIGNUP TO ORDER"}
      </Button>
    </div>
  );
};

export default BuildControls;
