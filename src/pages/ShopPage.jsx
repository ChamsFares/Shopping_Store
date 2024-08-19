import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import styles from "../styles/ShopPage.module.css";

export default function ShopPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((json) => setItems(json))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        Loading... <div className={styles.spinner} />
      </div>
    );

  if (error)
    return (
      <p className={styles.errorMessage}>A network error was encountered</p>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Store</h1>
      <div className={styles.productGrid}>
        {items.map((item) => (
          <Link key={item.id} to={`/product/${item.id}`} state={item}>
            <ProductCard item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}
