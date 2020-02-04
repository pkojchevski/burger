import React from "react";
import NavigationItem from "../NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import { ReactComponent as AuthIcon } from "../../../assets/icons/locker.svg";
import { ReactComponent as BurgerIcon } from "../../../assets/icons/burger.svg";
import { ReactComponent as OrdersIcon } from "../../../assets/icons/orders.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/icons/unlocker.svg";

const NavigationItems = ({ isAuth }) => (
  <div className={classes.NavigationItems}>
    <ul>
      <NavigationItem link="/" exact>
        <BurgerIcon width="35px" />
      </NavigationItem>
      {isAuth ? (
        <NavigationItem link="/orders">
          <OrdersIcon width="35px" />
        </NavigationItem>
      ) : null}
      {isAuth ? (
        <NavigationItem link="/logout">
          <LogoutIcon width="35px" />
        </NavigationItem>
      ) : (
        <NavigationItem link="/auth">
          <div>
            <AuthIcon width="35px" />
          </div>
        </NavigationItem>
      )}
    </ul>
  </div>
);

export default NavigationItems;
