import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, []);
  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout())
});

export default connect(null, mapDispatchToProps)(Logout);
