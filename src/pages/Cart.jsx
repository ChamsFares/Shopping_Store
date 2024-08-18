import { useContext } from "react";
import { CartContext } from "../components/CartContext";

function Cart() {
  const { cartItems } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.title}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price * item.quantity}</p>
        </div>
      ))}
      <h2>Total: ${total.toFixed(2)}</h2>
      <button onClick={() => alert("Checkout not implemented")}>
        Checkout
      </button>
    </div>
  );
}

export default Cart;
