import React from "react";
import '../styles/global.css'
const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
