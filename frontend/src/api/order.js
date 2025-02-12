import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const placeOrder = async (address, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/order`,address, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data.message;
  }
};
