import { useState } from "react";
import styles from "./ProductCard.module.css";

function ProductCard({ product, addToCard }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handleInput = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };
  const handleAddToCart = () => {
    addToCard(product, quantity);
    setQuantity(1);
  };
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{product.title}</h3>
      <img src={product.image} alt={product.title} className={styles.image} />
      <p className={styles.price}>Price: ${product.price}</p>
      <div className={styles.quantityControl}>
        <button onClick={handleDecrement} className={styles.quantityButton}>
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min="1"
          className={styles.quantityInput}
        />
        <button onClick={handleIncrement} className={styles.quantityButton}>
          +
        </button>
      </div>
      <button onClick={handleAddToCart} className={styles.addButton}>
        Add to Cart
      </button>
    </div>
  );
}
export default ProductCard;
