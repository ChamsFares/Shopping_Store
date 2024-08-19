import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import styles from "../styles/Cart.module.css";

export default function Cart({ close }) {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    updateQuantity,
    totalprice,
  } = useContext(CartContext);

  const delete_svg = (
    <svg
      aria-label="delete"
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth="2"
        d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5"
        color="currentColor"
      />
    </svg>
  );

  return (
    <div className={styles.cartContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your Cart</h2>
        <button className={styles.closeButton} onClick={close}>
          x
        </button>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className={styles.itemContainer}>
          <div className={styles.itemHeader}>
            <span className={styles.itemTitle}>{item.title}</span>
            <button
              className={styles.deleteButton}
              onClick={() => removeFromCart(item.id)}
            >
              {delete_svg}
            </button>
          </div>
          <div className={styles.itemDetails}>
            <div>Cost: ${item.price}</div>
            <div className={styles.quantityControl}>
              <button
                className={styles.quantityButton}
                onClick={() => updateQuantity(item.id, item.qty - 1)}
              >
                -
              </button>
              <span className={styles.quantity}>{item.qty}</span>
              <button
                className={styles.quantityButton}
                onClick={() => updateQuantity(item.id, item.qty + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.total}>Total: ${totalprice()}</div>

      <button className={styles.checkoutButton} onClick={clearCart}>
        Checkout
      </button>
    </div>
  );
}
