
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  );
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    // else localStorage.removeItem("token");
    if (username) localStorage.setItem("username", username);
    // else localStorage.removeItem("username");
  }, [token, username]);
  return (
    <AuthContext.Provider value={{ token, setToken, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
