
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./media.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Hooks/useAuth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
