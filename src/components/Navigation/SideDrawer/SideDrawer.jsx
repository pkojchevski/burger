import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Modal from "../../layout/UI/Modal/Modal";
import Aux from "../../../hoc/Wrapper";
import Backdrop from "../../layout/UI/Backdrop/Backdrop.component";

const SideDrawer = ({ open, closed, clicked, isAuth }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
