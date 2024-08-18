import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import styles from "./Navigation.module.css";

function Navigation() {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.nasItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.nasItem}>
          <Link to="/shop">Shop</Link>
        </li>
        <li className={styles.nasItem}>
          <Link to="/cart">Cart({itemCount})</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
