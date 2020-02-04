import React from "react";

import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = ({ drawerToggleClicked, isAuth }) => (
  <header className={classes.Toolbar}>
    {/* <DrawerToggle clicked={drawerToggleClicked} /> */}
    <div className={classes.Logo}>BURGERCRP</div>
    <NavigationItems isAuth={isAuth} />
  </header>
);

export default Toolbar;
