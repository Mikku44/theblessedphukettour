'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartContext } from "../variants/context";




// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState({ listItems: [] });
 
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
