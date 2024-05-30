import { useEffect, useState } from "react";
import axios from "axios";
export default function ProductApi() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await axios.get("/api/products");
    // console.log(res)
    // console.log(res.data)
    setProducts(res.data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return {
    products: [products, setProducts],
  };
}
