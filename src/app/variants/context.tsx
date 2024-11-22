import { createContext } from "react";

type CartContextType = {
    cart: { listItems: any[] };
    setCart: React.Dispatch<React.SetStateAction<{ listItems: any[] }>>;
  };
  
// Create the context
export const CartContext = createContext<CartContextType | undefined>(undefined);