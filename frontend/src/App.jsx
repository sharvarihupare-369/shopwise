import React from "react";
import AllRoutes from "./pages/AllRoutes";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];
  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <AllRoutes />
    </>
  );
}

export default App;
