import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    const loginData = new FormData(e.target);
    const userEmail = loginData.get("userEmail");
    const userPassword = loginData.get("userPassword");

    const API_URL = "https://nestbook-backend.onrender.com";
    let token = "";
    const myHeaderLogin = new Headers();
    myHeaderLogin.append("Content-type", "application/json");
    const raw = JSON.stringify({ email: userEmail, password: userPassword });
    const requestOptions = {
      method: "POST",
      headers: myHeaderLogin,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(`${API_URL}/auth/login`, requestOptions);
      const loginData = await response.json();
      token = loginData.token;
      console.log(token);
      if (token) {
        setIsAuthenticated(true);
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        navigate("/oops");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
