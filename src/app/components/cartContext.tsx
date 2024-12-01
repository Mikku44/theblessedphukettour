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



import { createContext, useEffect, useState } from "react";




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

export function getProductData(id: string) {
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
    addOneToCart: (pd: any) => void;
    removeOneFromCart: (id: string) => void;
    deleteFromCart: (id: string) => void;
    getTotalCost: () => number;
}

// Default values
const defaultContext: CartContextType = {
    items: [],
    getProductQuantity: () => 0,
    addOneToCart: () => { },
    removeOneFromCart: () => { },
    deleteFromCart: () => { },
    getTotalCost: () => 0
};
export const CartContext = createContext<CartContextType>(defaultContext);
export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]

    useEffect(() => {
        if (cartProducts.length > 0) {
            console.log("set localstorage PRODUCT")
            localStorage.setItem("cart", JSON.stringify(cartProducts))
        }
    }, [cartProducts]);

    useEffect(() => {
        const tempCart = JSON.parse(localStorage.getItem("cart"));
        if (tempCart) {
            console.log("SET CART PRODUCT")
            setCartProducts(tempCart);}
    }, []);

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(pd: any) {
        setCartProducts((prevCartProducts) => {
            const existingProduct = prevCartProducts.find((product) => product.id === pd.id);

            if (existingProduct) {
                // Update the quantity if the product already exists in the cart
                return prevCartProducts.map((product) =>
                    product.id === pd.id
                        ? { ...product, quantity: product.quantity + pd.quantity }
                        : product
                );
            } else {
                // Add the new product to the cart
                return [
                    ...prevCartProducts,
                    pd
                ];
            }
        });

    }


    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity == 1) {
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

    const contextValue: any = {
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

