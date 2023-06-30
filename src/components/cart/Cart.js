import React, { useContext } from "react";
import { CartItem } from "./CartItem";
import { useNavigate } from "react-router-dom";
import { MedicineContext } from "./MedicineContext";

import "./Cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout, medicinesData } =
    useContext(MedicineContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {medicinesData.map((medicine) => {
          if (cartItems[medicine.medicineId] > 0) {
            return <CartItem data={medicine} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/medicines")}>
            {" "}
            Continue Shopping{" "}
          </button>
          <button
            onClick={() => {
              checkout();
              console.log(cartItems);
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
