import React from "react";
import classes from "./Charger.module.css";

export default function Charger({ quantity }) {
  let chargeL1 = null;
  let chargeL2 = null;
  let chargeL3 = null;
  let chargeL4 = null;

  switch (quantity) {
    case 1:
      chargeL1 = true;
      break;
    case 2:
      chargeL1 = true;
      chargeL2 = true;
      break;
    case 3:
      chargeL1 = true;
      chargeL2 = true;
      chargeL3 = true;
      break;
    case 4:
      chargeL1 = true;
      chargeL2 = true;
      chargeL3 = true;
      chargeL4 = true;
      break;
  }
  return (
    <div className={classes.Charger}>
      <div className={chargeL1 ? classes.L1 : ""}></div>
      <div className={chargeL2 ? classes.L2 : ""}></div>
      <div className={chargeL3 ? classes.L3 : ""}></div>
      <div className={chargeL4 ? classes.L4 : ""}></div>
    </div>
  );
}
