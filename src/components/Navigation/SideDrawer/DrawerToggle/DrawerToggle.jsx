import React from "react";
import classes from "./DrawerToggle.module.css";
import { ReactComponent as MenuIcon } from "../../../../assets/icons/menu.svg";

const DrawerToggle = ({ clicked }) => (
  <div onClick={clicked} className={classes.DrawerToggle}>
    <MenuIcon />
  </div>
);

export default DrawerToggle;
