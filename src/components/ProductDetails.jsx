import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import styles from "../styles/ProductDetails.module.css";

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const item = location.state;

  const handleQuantityChanged = (value) => {
    if (value <= 1) {
      value = 1;
    }
    setQuantity(value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{item.title}</h1>
      <div className={styles.content}>
        <img src={item.image} alt="" className={styles.image} />
        <div className={styles.details}>
          <h3>
            Price: ${item.price} Rating:{item.rating.rate}/5{" "}
          </h3>
          <h3>
            <button
              className={styles.button}
              onClick={() => addToCart(item, quantity)}
            >
              Add to Cart
            </button>
            <button
              className={styles.quantityButton}
              onClick={() => {
                handleQuantityChanged(quantity - 1);
              }}
            >
              -
            </button>
            Quantity:{quantity}
            <button
              className={styles.quantityButton}
              onClick={() => {
                handleQuantityChanged(quantity + 1);
              }}
            >
              +
            </button>
          </h3>

          <p>{item.description}</p>
          <Link to="/">
            <button className={styles.continueShoppingButton}>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
