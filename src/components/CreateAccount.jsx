import { useNavigate } from "react-router-dom";

import Button from "./Button";
import { FormCreateAccount } from "./FormCreateAccount";
export function CreateAccount() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <main className="create-account">
      <section className="container-create-account">
        <header className="header-create-account">
          <div className="header-create-account-title">
            <h1>Registrate</h1>
            <span>Es rápido y fácil.</span>
          </div>
          <Button className={"register-cancel"} onClick={handleCancel}>
            X
          </Button>
        </header>
        <FormCreateAccount></FormCreateAccount>
      </section>
    </main>
  );
}
