import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
const AuthContext = createContext();

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState("hola");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (e) => {
    e.preventDefault();

    const loginData = new FormData(e.target);
    const userEmail = loginData.get("userEmail");
    const userPassword = loginData.get("userPassword");

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
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, requestOptions);
      if (!response.ok) {
        throw new Error(`Error al realizar la petición: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      token = data.token;
      console.log(token);
      if (token) {
        console.log(data);
        setIsAuthenticated(true);
        setUserData(data.user);
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        navigate("/oops");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const reload = async () => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/me`, requestOptions);
      if (!response.ok) {
        throw new Error(`Error al realizar la petición: ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        console.log(data);
        setIsAuthenticated(true);
        const userActive = data.user;
        setUserData(userActive);
        navigate("/home");
      } else {
        navigate("/oops");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const tokenLocalStorage = () => {
    setIsAuthenticated(true);
    navigate("/home");
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserData(null);
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        tokenLocalStorage,
        login,
        logout,
        isLoading,
        error,
        userData,
        reload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
