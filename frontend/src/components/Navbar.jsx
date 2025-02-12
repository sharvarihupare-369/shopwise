import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import { logoutUser } from "../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.success) {
        toast.success(data.message);
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/login");
        }, 3000);
      } else {
        toast.error(response);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Shopwise
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/addtocart"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            <IoCartOutline size={20} /> <span className="ml-1">Cart</span>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-3 bg-white p-4 shadow-lg rounded-lg">
          <Link
            to="/addtocart"
            className="flex items-center text-gray-700 hover:text-blue-600 transition"
          >
            <IoCartOutline size={20} /> <span className="ml-1">Cart</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition "
          >
            Logout
          </button>
        </div>
      )}
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
