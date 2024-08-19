import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import styles from "../styles/Navbar.module.css";

export default function Navbar({ toggle }) {
  const { totalItems } = useContext(CartContext);
  return (
    <nav className={styles.nav}>
      <div className={styles.linkContainer}>
        <Link to="/Home" className={styles.link}>
          Home
          <div className={styles.linkUnderline}></div>
        </Link>
        <Link to="/" className={styles.link}>
          Shop
          <div className={styles.linkUnderline}></div>
        </Link>
      </div>

      <button className={styles.cartButton} onClick={() => toggle()}>
        Cart ({totalItems})
      </button>
    </nav>
  );
}
