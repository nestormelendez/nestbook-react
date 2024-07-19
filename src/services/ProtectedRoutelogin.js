import { useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";


export const ProtectedRouteLogin = ({ children }) => {
        const token = localStorage.getItem("token");
        const { tokenLocalStorage } = useAuth();

        useEffect(() => {
            if (token) {
                tokenLocalStorage();
            }
        }, []);

        return children;
    };