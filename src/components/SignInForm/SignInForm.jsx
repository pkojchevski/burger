import React, { useState, useEffect } from "react";
import Button from "../layout/UI/Button/Button";
import classes from "./SignInForm.module.css";
import { checkValidity } from "../../shared/utils.js";
import Input from "../layout/UI/Input/Input";
import { connect } from "react-redux";
import Spinner from "../layout/UI/Spinner/Spinner";
import Wrapper from "../../hoc/Wrapper";
import { useSpring, animated } from "react-spring";

const SignInForm = ({ loading, onSignInClick, error, isAuth }) => {
  const props = useSpring({ x: 0, from: { x: 80 } });
  const [formIsValid, setFormIsValid] = useState(false);
  const [authForm, setAuthForm] = useState({
    controls: {
      email: {
        elType: "input",
        label: "Mail address",
        elConfig: {
          type: "email",
          placeholder: "Mail address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
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
    },
    isSignup: true
  });

  const formElArr = [];
  for (let key in authForm.controls) {
    formElArr.push({
      id: key,
      config: authForm.controls[key]
    });
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...authForm.controls
    };
    const updatedFormElement = {
      ...updatedAuthForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedAuthForm[inputIdentifier] = updatedFormElement;
    setAuthForm({ controls: updatedAuthForm });
    setFormIsValid(
      authForm.controls.email.valid && authForm.controls.password.valid
    );
  };

  return (
    <Wrapper>
      <div className={classes.title}>LOGIN</div>
      <form
        onSubmit={event =>
          onSignInClick(
            event,
            authForm.controls.email.value,
            authForm.controls.password.value
          )
        }
      >
        <div className={classes.Inputs}>
          {formElArr.map(formEl => (
            <Input
              key={formEl.id}
              elementType={formEl.config.elType}
              elementConfig={formEl.config.elConfig}
              value={formEl.config.value}
              changed={event => inputChangedHandler(event, formEl.id)}
              invalid={!formEl.config.valid}
              valid={formEl.config.valid}
              touched={formEl.config.touched}
              label={formEl.config.label}
              inputColor="black"
            />
          ))}
        </div>
        <Button
          type="submit"
          btnColor="btnWhite"
          colorOutline="redOutline"
          disabled={!formIsValid}
        >
          {!isAuth ? (
            loading ? (
              <Spinner />
            ) : (
              "LOGIN"
            )
          ) : (
            <svg width="30" height="30" viewBox="0 0 24 24">
              <animated.path
                // className={isAuth ? classes.path : null}
                strokeDashoffset={props.x}
                fill={"none"}
                stroke={"#f2d50f"}
                strokeWidth={"2px"}
                strokeDasharray={80}
                d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z"
              ></animated.path>
            </svg>
          )}
        </Button>
      </form>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: state.auth.token !== null
});

export default connect(mapStateToProps)(SignInForm);
