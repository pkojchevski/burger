import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

const Burger = ({ ingrs, ingrEmpty }) => {
  let transformedIngrs = ingrs
    .map(ingr =>
      [...Array(ingr.quantity)].map((_, i) => (
        <BurgerIngredients key={ingr.name + i} type={ingr.name} />
      ))
    )
    .reduce((sum, el) => sum.concat(el), []);

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {ingrEmpty ? <p>Please start adding ingredients!</p> : transformedIngrs}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
