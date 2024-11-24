'use client';

// import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import { CartContext } from "../variants/context";




// // Create the provider component
// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState({ listItems: [] });
 
//   return (
//     <CartContext.Provider value={{ cart, setCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Hook to use the CartContext
// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };



import { createContext, useState } from "react";




const productsArray = [
  {
      id: "price_1QJG3mKPeOxP17Ebgp2hYBht",
      title: "Kittiya trip",
      price: 4.99
  },
  {
      id: "price_1QLlOHKPeOxP17Ebe5uJ7YtY",
      title: "Kittiya trip (child)",
      price: 9.99
  },
  {
      id: "price_1LnUUoDM1jwCEz8OvxIcJ7to",
      title: "Camera",
      price: 39.99
  }
];

export function getProductData(id:string) {
  let productData = productsArray.find(product => product.id === id);

  if (productData == undefined) {
      console.log("Product data does not exist for ID: " + id);
      return undefined;
  }

  return productData;
}


// Define the structure of your CartContext
interface CartContextType {
  items: any[];
  getProductQuantity: (id: string) => number;
  addOneToCart: (id: string,qty:number) => void;
  removeOneFromCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
  getTotalCost: () => number;
}

// Default values
const defaultContext: CartContextType = {
  items: [],
  getProductQuantity: () => 0,
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => 0
};
export const CartContext = createContext<CartContextType>(defaultContext);
export function CartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);
    
    // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        
        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id: number, qty: number) {
      setCartProducts((prevCartProducts) => {
          const existingProduct = prevCartProducts.find((product) => product.id === id);
  
          if (existingProduct) {
              // Product is already in the cart, update its quantity
              return prevCartProducts.map((product) =>
                  product.id === id
                      ? { ...product, quantity: product.quantity + qty } // Update quantity
                      : product // Keep other products unchanged
              );
          } else {
              // Product is not in the cart, add it
              return [
                  ...prevCartProducts,
                  { id, quantity: qty } // Add the new product
              ];
          }
      });
  }
  

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if(quantity == 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id                                // if condition
                    ? { ...product, quantity: product.quantity - 1 } // if statement is true
                    : product                                        // if statement is false
                )
            )
        }
    }

    function deleteFromCart(id) {
        // [] if an object meets a condition, add the object to array
        // [product1, product2, product3]
        // [product1, product3]
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.id != id;
            })  
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity);
        });
        return totalCost;
    }

    const contextValue :any = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

