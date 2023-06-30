import React, { useContext } from "react";
import { MedicineContext } from "./MedicineContext";

export const CartItem = (props) => {
  const { medicineId, medicineName, url, quantity, price, manufacturingDate, expiryDate } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(MedicineContext);

  return (
    <div className="cartItem">
      <img src={url} />
      <div className="description">
        <p>
          <b>{medicineName}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(medicineId)}> - </button>
          <input
            value={cartItems[medicineId]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), medicineId)}
          />
          <button onClick={() => addToCart(medicineId)}> + </button>
        </div>
      </div>
    </div>
  );
};
