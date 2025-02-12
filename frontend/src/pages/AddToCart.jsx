import React, { useEffect, useState } from "react";
import { getProductsFromCart } from "../api/products";
import { toast, ToastContainer } from "react-toastify";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AddToCart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const data = await getProductsFromCart(token);
      if (data.success && data.data.length > 0) {
        setCart(data.data[0].items || []);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.productId._id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
    const deliveryCharge = subtotal > 500 ? 0 : 50; 
    const tax = subtotal * 0.1; 
    const totalPrice = subtotal + tax + deliveryCharge;

    return { subtotal, tax, deliveryCharge, totalPrice };
  };

  const { subtotal, tax, deliveryCharge, totalPrice } = calculateTotal();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🛒 Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {cart.map((item) => (
              <div
                key={item.productId._id}
                className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row items-center"
              >
                <img
                  src={item.productId.imageUrl}
                  alt={item.productId.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="ml-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold">
                    {item.productId.title}
                  </h2>
                  <p className="text-gray-500">
                    ₹{item.productId.price.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity - 1
                          )
                        }
                        className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity + 1
                          )
                        }
                        className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button className="text-red-600 hover:text-red-800">
                      <IoTrashOutline size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery Charges:</span>
              <span>
                {deliveryCharge === 0
                  ? "Free"
                  : `₹${deliveryCharge.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4 border-t pt-3">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddToCart;
