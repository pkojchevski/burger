import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const Logo = ({ height }) => (
  <div className={classes.Logo} style={{ height: height }}>
    <img src={burgerLogo} alt="Burger" />
  </div>
);
export default Logo;
