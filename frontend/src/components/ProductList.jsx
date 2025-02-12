import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {
  getAllProducts,
  getProductsFromCart,
  productAddToCart,
} from "../api/products";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  const addToCart = async (id) => {
    const productData = {
      productId: id,
      quantity: 1,
    };
    const response = await productAddToCart(productData, token);
    if (response.success) {
      toast.success(response.message || "Product Added To Cart!");
      setCart((prevCart) => [...prevCart, productData]);
      setTimeout(() => {
        navigate("/addtocart");
      }, 2000);
    } else {
      toast.error(response.message || "Failed to add product to cart.");
    }
  };

  const fetchCart = async () => {
    try {
      const data = await getProductsFromCart(token);
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setCart(data?.data[0]?.items);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts(token);
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
      fetchCart();
    }
  }, []);

  return isLoading ? <Loader/>:  (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.length > 0 ? (
          products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
              cart={cart}
            />
          ))
        ) : (
          <h1>No Products Found</h1>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
