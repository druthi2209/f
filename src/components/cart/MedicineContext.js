import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

// import { MEDICINES } from "../helpers/MedicineList";

export const MedicineContext = createContext(null);

export const MedicineContextProvider = (props) => {
  const [medicinesData, setMedicinesData] = useState([]);

  const cartItemRequest = []

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i <= medicinesData.length; i++) {
      cart[i] = 0;
    }
    console.log(cart)
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const loadMedicines = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const results = await axios.get("http://localhost:8080/getAllMedicines", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setMedicinesData(results.data);
      console.log("Medicine", medicinesData);
    } catch (e) {
      console.log(e);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // console.log(cartItems)
    for (const item in cartItems) {
      // console.log(item)
      if (cartItems[item] > 0) {
        // console.log(medicinesData)
        let itemInfo = medicinesData.find(
          (medicine) => medicine.medicineId === Number(item)
        );
        // console.log(itemInfo)
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    console.log(itemId)
    console.log(cartItems)
    setCartItems((prevCartItems) => {
      const updatedCartItems = {...prevCartItems};
      updatedCartItems[itemId] = updatedCartItems[itemId]+1 || 1;
      return updatedCartItems
    });
    console.log(cartItems)
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const saveCartItems = async () => {
    let jwtToken = localStorage.getItem("jwtToken");
    let userId = localStorage.getItem("userId");
    medicinesData.map((item) => {
      if(cartItems[item.medicineId] > 0){
        cartItemRequest.push({
          medicine: item,
          quantity: cartItems[item.medicineId],
          price: item.price*cartItems[item.medicineId]
        })
      }
    })
    await axios.post("http://localhost:8080/addToCart/" + userId, cartItemRequest, {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });
  };
  const checkout = () => {
    saveCartItems();
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    medicinesData,
    setMedicinesData,
    loadMedicines,
    cartItemRequest,
    setCartItems,
    getDefaultCart
  };

  return (
    <MedicineContext.Provider value={contextValue}>
      {props.children}
    </MedicineContext.Provider>
  );
};
