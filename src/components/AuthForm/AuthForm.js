import React, { useState } from "react";
import { connect } from "react-redux";
import SignInForm from "../SignInForm/SignInForm.jsx";
import classes from "./AuthForm.module.css";
import RegisterForm from "../RegisterForm/RegisterForm";
import * as actions from "../../store/actions/auth";

const AuthForm = ({ onAuth }) => {
  const [animButtonClass, setAnimButtonClass] = useState([
    classes.materialButton,
    classes.alt2,
    classes.minWidth
  ]);
  const [boxClasses, setBoxClasses] = useState([classes.box]);
  const [shapeStyle, setShapeStyle] = useState({});
  const [overBoxStyle, setOverBoxStyle] = useState({});
  const [registerFormStyle, setRegisterFormStyle] = useState([classes.fadeOut]);
  const [overBoxTitleClass, setOverBoxTitleClass] = useState([
    classes.overBoxTitle
  ]);
  const goToSignup = () => {
    if (animButtonClass.includes(classes.materialButton)) {
      setTimeout(() => {
        setOverBoxStyle({
          overflow: "hidden"
        });
        setBoxClasses(prev => [...prev, classes.back]);
      }, 200);

      setAnimButtonClass(prev => [...prev, classes.active]);

      setTimeout(() => {
        setShapeStyle({
          width: "10%",
          height: "10%",
          transform: "rotate(45deg)",
          top: "170px",
          right: "150px",
          background: "white",
          borderRadius: "50%"
        });
        setRegisterFormStyle([classes.fadeIn]);
        setOverBoxTitleClass([classes.overBoxTitle, classes.fadeIn]);
      }, 700);
      setAnimButtonClass([classes.alt2, classes.active, classes.maxWidth]);
    } else {
      setShapeStyle({
        width: "100%",
        height: "100%",
        transform: "rotate(0deg)",
        top: "0",
        right: "0"
      });
      setTimeout(() => {
        setOverBoxStyle({
          overflow: "hidden"
        });
      }, 600);
      setBoxClasses([classes.box]);
      setAnimButtonClass([
        classes.alt2,
        classes.materialButton,
        classes.minWidth
      ]);
      setRegisterFormStyle([classes.fadeOut]);
      setOverBoxTitleClass([classes.overBoxTitle, classes.fadeOut]);
    }
  };

  const signInClickHandler = (event, email, password) => {
    event.preventDefault();
    onAuth(email, password, false);
  };

  const registerClickHandler = (event, email, password) => {
    event.preventDefault();
    onAuth(email, password, true);
  };

  return (
    <div className={classes.materialContainer}>
      <div className={boxClasses.join(" ")}>
        <SignInForm onSignInClick={signInClickHandler} />
      </div>

      <div className={classes.overBox} style={overBoxStyle}>
        <div className={animButtonClass.join(" ")} onClick={goToSignup}>
          <span className={classes.shape} style={shapeStyle}></span>
        </div>

        <div className={overBoxTitleClass.join(" ")}>REGISTER</div>
        <div className={registerFormStyle.join(" ")}>
          <RegisterForm onRegisterClick={registerClickHandler} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
