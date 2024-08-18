import ProductCard from "../components/ProductsCard";
import useCart from "../Hooks/useCart";
import useProducts from "../Hooks/useProducts";

function Shop() {
  const { products, isloading, error } = useProducts();
  const { addToCart } = useCart();

  if (isloading) {
    return <div className="">Loading products...</div>;
  }
  if (error) {
    return <div className="">Eroor : {error}</div>;
  }
  return (
    <div>
      <h1></h1>
      <div>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCard={addToCart}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
}
export default Shop;
