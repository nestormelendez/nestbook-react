import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useEffect } from "react";
export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const { isAuthenticated, reload, isLoading, error } = useAuth();
  const location = useLocation();
  useEffect(() => {
    reload();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ location, ruta: location.pathname }} />;
  }
  if (isLoading) {
    return <div className="input-text">Cargando...</div>;
  }

  if (error) {
    return <div>Error al obtener los Posts: {error.message}</div>;
  }
  return children;
};
