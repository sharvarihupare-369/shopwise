import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { loginUser } from "../api/auth";

const Login = () => {
  const [email, setEmail] = useState("sharvari@gmail.com");
  const [password, setPassword] = useState("Sharvari@123");
  const navigate = useNavigate();
  const { setToken, setUsername } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      const res = await loginUser(userData);
      console.log(res,"res");
      if (res.success) {
        toast.success(res.message);
        setToken(res.data.token);
        // setUsername(res.data.fullName);
        setEmail("");
        setPassword("");
        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
      if (!res.token) {
        toast.error(res);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="flex  text-md font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="flex text-md font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Login;
