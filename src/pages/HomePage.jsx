import { Link } from "react-router-dom";
import ImageCarousel from "../components/Carosel";
import styles from "../styles/HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Best Prices and Latest Products! Shop now!
      </h1>

      <div className={styles.carouselContainer}>
        <ImageCarousel />
      </div>

      <Link to="/shop" className={styles.shopButton}>
        Shop Now
      </Link>
    </div>
  );
}

export default HomePage;
