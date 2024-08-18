import { useEffect, useState } from "react";
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Faild to fetch products");
        }
        const data = response.json;
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    return fetchProducts;
  }, []);
  return { products, isloading, error };
};

export default useProducts;
