// import React, { useState } from "react";
// import { IoCartOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

// const ProductCard = ({ product, addToCart, cart }) => {
//   const [hovered, setHovered] = useState(false);
//   const navigate = useNavigate();

//   const isProductInCart = cart.some((el) => el.productId._id === product._id);

//   return (
//     <div
//       className="border rounded-xl overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-2xl bg-white"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <img
//         src={product.imageUrl}
//         alt={product.title}
//         className="w-full h-60 object-cover"
//       />
//       <div className="p-4">
//         <h2 className="text-lg font-semibold">{product.title}</h2>
//         <p className="text-gray-500">₹{product.price.toFixed(2)}</p>

//         {isProductInCart ? (
//           <button
//             onClick={() => navigate("/addtocart")}
//             className="mt-3 w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition cursor-pointer"
//           >
//             🛒 Go to Cart
//           </button>
//         ) : (
//           <button
//             onClick={() => addToCart(product._id)}
//             className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition cursor-pointer"
//           >
//             <IoCartOutline size={18} /> {hovered ? "Add to Cart" : ""}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React, { useState } from "react";
import {
  IoBagCheckOutline,
  IoCartOutline,
  IoHeartOutline,
  IoHeartSharp,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart, cart }) => {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const isProductInCart = cart.some((el) => el.productId._id === product._id);

  return (
    <div
      className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={() => setLiked(!liked)}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          {liked ? (
            <IoHeartSharp className="text-red-500 text-lg" />
          ) : (
            <IoHeartOutline className="text-gray-700 text-lg" />
          )}
        </button>
      </div>

      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <p className="text-gray-500 font-medium">₹{product.price.toFixed(2)}</p>
      </div>

      <div className="absolute bottom-3 right-3">
        {isProductInCart ? (
          <button
            onClick={() => navigate("/addtocart")}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition shadow-md"
          >
            <IoBagCheckOutline size={22} />
          </button>
        ) : (
          <button
            onClick={() => addToCart(product._id)}
            className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md"
          >
            <IoCartOutline size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
