import axios from "axios";
const BASE_URL = "https://shopwise-xbac.onrender.com";

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

// export const logoutUser = async (token) => {
//   try {
//     const res = await axios.post(`${BASE_URL}/users/logout`, null, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // return res;
//     // console.log(res.data);
//     if (res.status === 200) {
//       return res.data.message;
//     }
//   } catch (error) {
//     console.log(error.response.data.message);
//     return error.response.data.message;
//   }
// };
