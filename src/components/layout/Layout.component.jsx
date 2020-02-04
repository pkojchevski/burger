import React, { useState } from "react";
import { connect } from "react-redux";
import Wrapper from "../../hoc/Wrapper";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(prevState => !prevState);
  };

  return (
    <Wrapper className="Content">
      {/* <div></div> */}
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuth={props.isAuth}
      />
      {/* <SideDrawer
        open={showSideDrawer}
        closed={showSideDrawer}
        clicked={sideDrawerToggleHandler}
        isAuth={props.isAuth}
      /> */}
      <main className={classes.Content}>{props.children}</main>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
