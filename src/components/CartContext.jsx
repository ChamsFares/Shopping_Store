import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ Children }) => {
  const [cartItems, setCartitmes] = useState([]);
  const addToCart = (product, quantity) => {
    setCartitmes((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {Children}
    </CartContext.Provider>
  );
};
