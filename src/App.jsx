import "./App.css";
import { CreateAccount } from "./components/CreateAccount";
import { Login } from "./components/Login";
import { Oops } from "./components/Oops";
import { Route, Routes } from "react-router-dom";
import { ProtectedRouteLogin } from "./services/ProtectedRoutelogin";
import { ProtectedRoute } from "./services/ProtectedRoute";
import Home from "./components/Home";

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
