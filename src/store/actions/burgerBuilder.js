import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingredient => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient
});

export const removeIngredient = ingredient => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredient
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

export const fetchIngredientsError = () => ({
  type: actionTypes.FETCH_INGREDIENTS_ERROR
});

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(err => {
        dispatch(fetchIngredientsError());
      });
  };
};

export const initPrice = () => ({
  type: actionTypes.INIT_PRICE
});
