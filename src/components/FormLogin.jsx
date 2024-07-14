import { useNavigate } from "react-router-dom";
import { NavLink } from "./NavLink";
import { useAuth } from "../Hooks/useAuth";
import Button from "./Button";
import Input from "./Input.jsx";

import TimeoutComponent from "./SetTimeOut.jsx";

export function FormLogin() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const handleCreateAccount = () => {
    navigate("/createAccount");
  };

  return (
    <form action="" className="form-login" onSubmit={login}>
      <Input
        type="email"
        name="userEmail"
        placeholder="Correo electrónico o número de teléfono"
        required
      />
      <Input
        type="password"
        name="userPassword"
        placeholder="Contraseña"
        required
      />
      <div className="error-container">
        {error ? (
          <TimeoutComponent
            time={3500}
            initialMessage={`El usuario o la contraseña no estan registrados...`}
            secondaryMessage={""}
          />
        ) : (
          <p></p> // Si isLoggedIn es false
        )}
      </div>

      <Button className={"--get-into"} type={"submit"}>
        Iniciar sesión
      </Button>

      <NavLink to="/oops">
        <span>¿Has olvidado la contraseña?</span>
      </NavLink>
      <article>
        <Button className={"--create-account"} onClick={handleCreateAccount}>
          Crear cuenta nueva
        </Button>

        <div>
          {isLoading ? (
            <p className="cargando">¡Cargando.....!</p> // Si isLoggedIn es true
          ) : (
            <p></p> // Si isLoggedIn es false
          )}
        </div>
      </article>
    </form>
  );
}
