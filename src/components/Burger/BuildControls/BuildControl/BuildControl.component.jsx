import React from "react";

import classes from "./BuildControl.module.css";
import Charger from "../../../../components/layout/UI/Charger/Charger";
import { ReactComponent as AddIcon } from "../../../../assets/icons/add.svg";
import { ReactComponent as MinusIcon } from "../../../../assets/icons/minus.svg";

const BuildControl = ({ label, added, removed, price, quantity }) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Price}>{price}&euro;</div>
      <div className={classes.Label}>{label}</div>

      <button className={classes.MinusIconButton} disabled={quantity === 0}>
        <MinusIcon
          width="35px"
          className={[classes.Less, classes.icon].join(" ")}
          onClick={removed}
        />
      </button>
      <button className={classes.AddIconButton} disabled={quantity === 4}>
        <AddIcon
          width="35px"
          className={[classes.More, classes.icon].join(" ")}
          onClick={added}
        />
      </button>
      <Charger quantity={quantity} />
    </div>
  );
};

export default BuildControl;
