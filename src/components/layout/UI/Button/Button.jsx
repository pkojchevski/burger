import React from "react";

import Aux from "../../../../hoc/Wrapper";
import classes from "./Button.module.css";

const Button = props => {
  return (
    <Aux>
      <button
        onClick={props.clicked}
        disabled={props.disabled}
        className={[classes.Button, classes[props.colorOutline]].join(" ")}
      >
        {props.children}
        <span
          className={[classes.coverTop, classes[props.btnColor]].join(" ")}
        ></span>
        <span
          className={[classes.coverBot, classes[props.btnColor]].join(" ")}
        ></span>
      </button>
    </Aux>
  );
};

export default Button;
