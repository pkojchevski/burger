import React, { useEffect, useState } from "react";
import classes from "./Toast.module.css";

import { ReactComponent as SuccessIcon } from "../../../../assets/icons/ok.svg";
import Aux from "../../../../hoc/Wrapper";

const Toast = props => {
  const [hide, setHide] = useState(props.show);
  const toastClass = [classes.Toast, classes.show].join(" ");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // console.log("here");
      setHide(false);
    }, 4200);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  });
  return (
    <Aux>
      <div className={!hide ? classes.Hide : null}>
        <div className={toastClass}>
          <div className={classes.Icon}>
            <SuccessIcon />
          </div>
          <div className={classes.Desc}>{props.message}</div>
        </div>
      </div>
    </Aux>
  );
};

export default Toast;
