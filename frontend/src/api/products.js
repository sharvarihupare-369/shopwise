import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;


export const getAllProducts = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/products/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res, "res");
    return res.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const productAddToCart = async (productData,token) => {
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

export const getProductsFromCart = async(token) => {
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
