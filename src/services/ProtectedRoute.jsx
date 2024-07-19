import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
export
    const ProtectedRoute = ({ children }) => {
        const { isAuthenticated } = useAuth();
        const location = useLocation();

        if (!isAuthenticated) {
            return <Navigate to="/" state={{ location, ruta: location.pathname }} />;
        }
        return children;
    };