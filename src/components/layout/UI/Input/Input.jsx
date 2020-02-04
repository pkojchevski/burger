import React from "react";
import classes from "./Input.module.css";
const Input = props => {
  let inputElement = null;
  const inputClasses = [
    classes.InputElement,
    props.valid ? classes.Valid : classes.Invalid,
    classes[props.inputColor]
  ];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.inputType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          className={classes[props.inputColor]}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          className={classes.props.inputColor}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.InputContainer}>
      {inputElement}
      <label className={[classes.Label, classes[props.inputColor]].join(" ")}>
        {props.label}
      </label>
      <span className={classes.Spin}></span>
    </div>
  );
};

export default Input;
