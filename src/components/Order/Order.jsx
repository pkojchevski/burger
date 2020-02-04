import React from "react";
import classes from "./Order.module.css";

const Order = ({ ingredients, price }) => {

  return (
    <div className={classes.Order}>
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {!ingredients
            ? null
            : ingredients
                .filter(el => el.quantity !== 0)
                .map((ingr, key) => (
                  <tr key={key}>
                    <td>{ingr.name}</td>
                    <td>{ingr.quantity}</td>
                    <td>{ingr.price}&euro;</td>
                  </tr>
                ))}
        </tbody>
      </table>
      <p style={{ width: "100%", textAlign: "right", fontSize: "20px" }}>
        <strong>{Number.parseFloat(price).toFixed(2)}&euro;</strong>
      </p>
    </div>
  );
};

export default Order;
