import { FormLogin } from "./FormLogin";

export function Login() {
  return (
    <main className="login">
      <section className="container-login">
        <article className="nestbook">
          <h1>NestBook</h1>
          <p>
            NestBook te ayuda a comunicarte y compartir con las personas que
            forman parte de tu vida.
          </p>
        </article>
        <FormLogin />
      </section>
    </main>
  );
}
