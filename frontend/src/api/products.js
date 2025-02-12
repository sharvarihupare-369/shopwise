import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res, "res");
    return res.data;
  } catch (error) {
    // console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const productAddToCart = async (productData) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/products/addtocart`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    // console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const getProductsFromCart = async() => {
  try {
    const res = await axios.get(`${BASE_URL}/products/getcart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res,"res")
    return res.data;
  } catch (error) {
    // console.log(error.response.data.message);
    return error.response.data.message;
  }
};
