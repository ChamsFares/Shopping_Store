import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartProvider from "./contexts/CartContext";
import Cart from "./pages/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);
  const toggle = () => {
    setShowCart(!showCart);
  };
  return (
    <CartProvider>
      <Navbar toggle={toggle} />
      <Outlet />
      {showCart && <Cart close={toggle} />}
    </CartProvider>
  );
}

export default App;
