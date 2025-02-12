import React, { useEffect, useState } from "react";
import { getProductsFromCart } from "../api/products";
import { toast, ToastContainer } from "react-toastify";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getProductsFromCart();
      if (data.success && data.data.length > 0) {
        setCart(data.data[0].items || []);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map((item) => (
            <div
              key={item.productId._id}
              className="bg-white p-4 rounded-xl shadow-lg"
            >
              <img
                src={item.productId.imageUrl}
                alt={item.title}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-3">
                {item.productId.title}
              </h2>
              <p className="text-gray-500">
                ₹{item.productId.price.toFixed(2)}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button className="px-2 py-1 bg-gray-200 rounded-r">+</button>
                </div>
                <button className="text-red-600 hover:text-red-800">
                  <IoTrashOutline size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddToCart;
