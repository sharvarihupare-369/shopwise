import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/register`, userData);
    console.log("User registered successfully:", res);
    return res.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/login`, userData);
    return res.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const logoutUser = async (token) => {
  console.log(token);
  try {
    const res = await axios.get(`${BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
