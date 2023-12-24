// cartContext.jsx
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCartHandler = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.itemNum === item.itemNum
    );

    if (existingItemIndex !== -1) {
      // If the item is already in the cart, increase its quantity
      const updatedCartItems = [...cartItems];
      const existingItem = updatedCartItems[existingItemIndex];
      existingItem.quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // If the item is not in the cart, add it to the cart with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    // Show an alert indicating the item is added to the cart
    alert(`Item ${item.title} added to cart.`);

    console.log(`Item ${item.itemNum} added to cart.`);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCartHandler }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};