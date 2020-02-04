export const addIngredient = (ingredients, ingrToAdd) => {
  const existingIngr = ingredients.find(
    ingredient => ingredient.name === ingrToAdd.name
  );

  if (existingIngr) {
    if (existingIngr.quantity === 4) {
      return ingredients;
    }
    return ingredients.map(ingr =>
      ingr.name === ingrToAdd.name
        ? { ...ingr, quantity: ingr.quantity + 1 }
        : ingr
    );
  }

  return [...ingredients, { ...ingrToAdd, quantity: 1 }];
};

export const removeIngredient = (ingredients, ingrToRemove) => {
  const existingIngr = ingredients.find(
    ingr => ingr.name === ingrToRemove.name
  );

  if (existingIngr.quantity === 0) {
    return ingredients;
  }

  //   if (existingIngr.quantity === 1) {
  //     return ingredients.filter(ingr => ingr.name !== ingrToRemove.name);
  //   }

  return ingredients.map(ingr =>
    ingr.name === ingrToRemove.name
      ? { ...ingr, quantity: ingr.quantity - 1 }
      : ingr
  );
};
