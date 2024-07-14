import "./App.css";
import { CreateAccount } from "./components/CreateAccount";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Oops } from "./components/Oops";
import { useAuth } from "./Hooks/useAuth";
import {
  Route,
  Routes,
  useParams,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ location, ruta: location.pathname }} />;
  }
  return children;
};
const ProtectedRouteLogin = ({children}) => {
  const token = localStorage.getItem("token");
  const { tokenLocalStorage } = useAuth();
  
  if(token) {
    tokenLocalStorage();
  }
  return children;
};
function App() {
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteLogin>
              <Login />
            </ProtectedRouteLogin>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/oops" element={<Oops />} />
      </Routes>
    </main>
  );
}

export default App;
