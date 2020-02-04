export const flatten = object => {
  return Object.assign(
    {},
    ...(function _flatten(objectBit, path = "") {
      //spread the result into our return object
      return [].concat(
        //concat everything into one level
        ...Object.keys(objectBit).map(
          //iterate over object
          key =>
            typeof objectBit[key] === "object" //check if there is a nested object
              ? _flatten(objectBit[key], `${key}`) //call itself if there is
              : { [path]: +objectBit[key] } //append object with it’s path as key
        )
      );
    })(object)
  );
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.isEmail) {
    isValid = regex.test(value) && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.minLength && isValid;
  }
  return isValid;
};

export const objToArr = obj => Object.keys(obj).map(key => obj[key]);

// export const util = obj =>
//   Object.keys(obj)
//     .map(igKey =>
//       [...Array(obj[igKey])].map((_, i) => (
//         <BurgerIngredients key={igKey + i} type={igKey} />
//       ))
//     )
//     .reduce((arr, el) => arr.concat(el), []);
