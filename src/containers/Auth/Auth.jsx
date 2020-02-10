import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import Toast from "../../components/layout/UI/Toast/Toast";

const Auth = ({
  onAuth,
  error,
  isAuth,
  buildingBurger,
  authRedirectPath,
  onSetAuthRedirectPath
}) => {
  const [isAuthWithTimeout, setIsAuthWithTimeout] = useState(false);
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
    const timer = setTimeout(() => setIsAuthWithTimeout(isAuth), 200);

    return () => clearTimeout(timer);
  }, [isAuth]);

  return (
    <div className={classes.AbsoluteWrapper}>
      <div className={classes.Auth}>
        {isAuthWithTimeout ? <Redirect to={authRedirectPath} /> : null}
        <AuthForm />
        {error ? <Toast message={error.message} show={true} /> : null}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
});

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: state.auth.token !== null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
