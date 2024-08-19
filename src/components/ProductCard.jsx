import styles from "../styles/ProductCard.module.css";

export default function ProductCard({ item }) {
  return (
    <div className={styles.card}>
      <img src={item.image} className={styles.image} alt={item.title} />
      <div className={styles.price}>${item.price}</div>
      <div className={styles.title}>
        {item.title.split(" ").slice(0, 12).join(" ")}
      </div>
    </div>
  );
}
