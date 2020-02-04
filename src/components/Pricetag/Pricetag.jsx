import React from "react";

import classes from "./Pricetag.module.css";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-default.css";

const Pricetag = ({ price }) => {
  // console.log("price:", price);
  // const props = useSpring({ number: price, from: { number: 4.5 } });
  return (
    <div className={classes.Pricetag}>
      Total price:
      <span className={classes.Price}>
        <Odometer format="(d).d" duration={100000} value={price} />
        {/* <animated.span>{props.number}</animated.span> */}
        <span className={classes.Euro}>&euro;</span>
      </span>
    </div>
  );
};

export default Pricetag;
