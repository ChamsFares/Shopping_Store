import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const addToCart = (item, quantity) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id); // check if the item is already in the cart

    if (isItemInCart) {
      setCartItems(
        cartItems.map(
          (
            cartItem // if the item is already in the cart, increase the quantity of the item
          ) =>
            cartItem.id === item.id
              ? { ...cartItem, qty: cartItem.qty + quantity }
              : cartItem // otherwise, return the cart item
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: quantity }]); // if the item is not in the cart, add the item to the cart
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 0) {
      removeFromCart(id);
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, qty } : item))
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const totalItems = cartItems.length;

  const totalprice = () => {
    return Number(
      cartItems.reduce((total, item) => total + item.price * item.qty, 0)
    ).toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        updateQuantity,
        totalprice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
