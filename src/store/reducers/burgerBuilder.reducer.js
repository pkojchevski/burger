import * as actionTypes from "../actions/actionTypes";
import { objToArr } from "../../shared/utils";
import { removeIngredient, addIngredient } from "./ingr.utils";

const initialState = {
  ingredients: [],
  totalPrice: 4.5,
  error: false,
  building: false
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: addIngredient(state.ingredients, action.ingredient),
        totalPrice:
          action.ingredient.quantity === 4
            ? state.totalPrice
            : state.totalPrice + action.ingredient.price,
        building: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: removeIngredient(state.ingredients, action.ingredient),
        totalPrice:
          action.ingredient.quantity === 0
            ? state.totalPrice
            : state.totalPrice - action.ingredient.price,
        building: true
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: objToArr({ ...action.ingredients }),
        error: false,
        building: false
      };
    case actionTypes.FETCH_INGREDIENTS_ERROR:
      return {
        ...state,
        error: true
      };
    case actionTypes.INIT_PRICE:
      return {
        ...state,
        totalPrice: 4.5
      };
    default:
      return state;
  }
};

export default burgerBuilderReducer;
