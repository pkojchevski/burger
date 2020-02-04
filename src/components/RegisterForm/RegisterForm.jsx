import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./RegisterForm.module.css";
import Button from "../layout/UI/Button/Button";
import Input from "../layout/UI/Input/Input";
import * as actions from "../../store/actions/index";
import Spinner from "../layout/UI/Spinner/Spinner";
import { checkValidity } from "../../shared/utils";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";

const RegisterForm = ({ loading, onRegisterClick, isAuth }) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formState, setFormState] = useState({
    orderForm: {
      email: {
        elType: "input",
        label: "Email address",
        elConfig: {
          type: "text",
          placeholder: "Address"
        },
        classes: classes.overBoxInput,
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elType: "input",
        label: "Password",
        elConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
      // address: {
      //   elType: "input",
      //   label: "Address",
      //   elConfig: {
      //     type: "text",
      //     placeholder: "Street"
      //   },
      //   classes: classes.overBoxInput,
      //   value: "",
      //   validation: {
      //     required: true
      //   },
      //   valid: false,
      //   touched: false
      // }
    }
  });
  const formElArr = [];
  for (let key in formState.orderForm) {
    formElArr.push({
      id: key,
      config: formState.orderForm[key]
    });
  }

  // const orderHandler = event => {
  //   event.preventDefault();
  //   let formData = {};
  //   for (let forElId in formState) {
  //     formData[forElId] = formState[forElId];
  //   }
  //   const order = {
  //     ingredients: ingr,
  //     price: price,
  //     orderData: formData,
  //     userId: localStorage.getItem("userId")
  //   };
  //   onOrderBurger(order, localStorage.getItem("token"));
  // };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...formState.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    setFormState({ orderForm: updatedOrderForm });
    setFormIsValid(
      formState.orderForm.email.valid && formState.orderForm.password.valid
    );
  };
  console.log(isAuth);
  return (
    <div className={classes.ContactData}>
      {/* {purchased ? <Redirect to="/" /> : null} */}
      {/* <div className={classes.Title}>Register</div> */}
      {
        <form
          onSubmit={event =>
            onRegisterClick(
              event,
              formState.orderForm.email.value,
              formState.orderForm.password.value
            )
          }
        >
          {formElArr.map(formEl => (
            <Input
              key={formEl.id}
              elementType={formEl.config.elType}
              elementConfig={formEl.config.elConfig}
              value={formEl.config.value}
              changed={event => inputChangedHandler(event, formEl.id)}
              invalid={!formEl.config.valid}
              shouldValidate={formEl.config.valid}
              touched={formEl.config.touched}
              label={formEl.config.label}
              inputColor="white"
            />
          ))}
          <Button
            type="submit"
            btnColor="btnRed"
            colorOutline="yellowOutline"
            disabled={!formIsValid}
          >
            {isAuth ? (
              <div className={classes.Check}>
                <CheckIcon />
              </div>
            ) : (
              "REGISTER"
            )}
          </Button>
        </form>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  ingr: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  userId: state.auth.userId,
  purchased: state.order.purchased,
  isAuth: state.auth.token != null
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
