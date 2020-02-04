import React, { useState, useEffect } from "react";
import Wrapper from "../../hoc/Wrapper";
import Burger from "../../components/Burger/Burger.component";
import BuildControls from "../../components/Burger/BuildControls/BuildControls.component";
import Modal from "../../components/layout/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/layout/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Pricetag from "../../components/Pricetag/Pricetag";
import Toast from "../../components/layout/UI/Toast/Toast";
import classes from "./BurgerBuilder.module.css";

const BurgerBuilder = ({
  history,
  ingrs,
  onIngredientAdded,
  onIngredientRemoved,
  price,
  onInitIngredients,
  error,
  onInitPurchase,
  isAuth,
  onBurgerPurchase,
  onSetOrderAfterLoginFail,
  orderAfterLogin,
  onSetOrderAfterLoginTrue,
  purchased,
  onInitPrice
}) => {
  const [purchasing, setPurchasing] = useState(false);
  const [orderIsDone, setOrderIsDone] = useState(false);

  useEffect(() => {
    if (orderAfterLogin && isAuth) {
      setPurchasing(true);
    } else if (ingrs.length === 0) {
      onInitIngredients();
      onInitPrice();
    }

    return () => {
      console.log("return");
      onSetOrderAfterLoginFail();
    };
  }, []);

  const onIngrEmpty = () => {
    if (!ingrs) return;
    const sum = ingrs.reduce((sum, obj) => sum + obj.quantity, 0);
    return sum <= 0;
  };

  const purchaseHandler = () => {
    if (!isAuth) {
      // onSetAuthRedirectPath("/checkout");
      history.push("/auth");
      onSetOrderAfterLoginTrue();
    } else {
      setPurchasing(true);
    }
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    setPurchasing(false);
    onBurgerPurchase(
      {
        ingredients: ingrs,
        price: ingrs.reduce((sum, obj) => sum + obj.quantity, 0),
        userId: localStorage.getItem("userId")
      },
      localStorage.getItem("token")
    );
    onInitIngredients();
    onInitPrice();
    setPurchasing(false);
    setOrderIsDone(true);
  };

  return (
    <Wrapper>
      <div className={classes.BurgerContent}>
        {error ? <Toast message={error.message} show={true} /> : null}
        {orderIsDone ? (
          <Toast message="Your order is placed" show={true} />
        ) : null}
        <Modal show={purchasing} modalClosed={() => setPurchasing(false)}>
          loading ? (
          <OrderSummary
            ingredients={ingrs}
            purchaseContinued={purchaseContinueHandler}
            purchaseCanceled={() => setPurchasing(false)}
            price={price}
          />
          )
        </Modal>

        <Pricetag price={price} />
        <Burger ingrs={ingrs} ingrEmpty={onIngrEmpty()} />
        <BuildControls
          addIngredient={onIngredientAdded}
          removeIngredient={onIngredientRemoved}
          price={price}
          purchasable={!onIngrEmpty()}
          purchase={purchaseHandler}
          isAuth={isAuth}
          ingrs={ingrs}
        />
      </div>
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return {
    ingrs: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
    purchased: state.order.purchased,
    orderAfterLogin: state.auth.orderAfterLogin
  };
};

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  onBurgerPurchase: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token)),
  onSetOrderAfterLoginFail: () => dispatch(actions.setOrderAfterLoginFail),
  onSetOrderAfterLoginTrue: () => dispatch(actions.setOrderAfterLoginTrue),
  onInitPrice: () => dispatch(actions.initPrice())
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
