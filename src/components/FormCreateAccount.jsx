import { NavLink } from "./NavLink";
import Button from "./Button";
import Input from "./Input.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchCreateAccocunt from "../Hooks/useAuthCreateAccount.jsx";
import { API_URL } from "../constants.js";
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const years = Array.from({ length: 100 }, (_, i) => 1925 + i).reverse();

export function FormCreateAccount() {
  const [selectValueDay, setSelectValueDay] = useState("");
  const [selectValueMonth, setSelectValueMonth] = useState("");
  const [selectValueYear, setSelectValueYear] = useState("");

  const handleDayChange = (e) => {
    setSelectValueDay(e.target.value);
  };
  const handleMonthChange = (e) => {
    setSelectValueMonth(e.target.value);
  };
  const handleYearChange = (e) => {
    setSelectValueYear(e.target.value);
  };

  const navigate = useNavigate();
  const { isLoading, error, data, fetchData } = useFetchCreateAccocunt();

  const useCreateAccount = async (e) => {
    e.preventDefault();

    const loginData = new FormData(e.target);
    const myHeaders = new Headers();

    fetchData({
      url: `${API_URL}/auth/register`,
      method: "POST",
      headers: myHeaders,
      body: loginData,
    });
  };

  if (data) {
    if (data.message) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      navigate("/oops");
    }
  }

  return (
    <form
      className="form-create-account"
      encType="multipart/form-data"
      onSubmit={useCreateAccount}
    >
      <div className="name-create-account">
        <Input type="text" name="name" placeholder="Nombre" required />
        <Input type="file" id="photo" name="photo" accept="image/*" required />
      </div>
      <Input
        type="email"
        name="email"
        placeholder="Número de móvil o correo electrónico"
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Contraseña nueva"
        required
      />
      <p>Fecha de nacimiento</p>
      <div className="select-create-account">
        <select
          className="select-text"
          name="inputEtiqueta"
          id="inputDay"
          value={selectValueDay}
          onChange={handleDayChange}
        >
          <option value="" disabled>
            Dia
          </option>
          {days.map((day) => (
            <option className="input-text" key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <select
          className="select-text"
          name="inputEtiqueta"
          id="inputMonth"
          value={selectValueMonth}
          onChange={handleMonthChange}
        >
          <option value="" disabled>
            Mes
          </option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          className="select-text"
          name="inputEtiqueta"
          id="inputYear"
          value={selectValueYear}
          onChange={handleYearChange}
        >
          <option value="" disabled>
            Año
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <p>Género</p>
      <div className="select-create-account">
        <span className="radio-text">
          <label htmlFor="mujer">Mujer</label>
          <input name="genero" type="radio" id="mujer" value="mujer" />
        </span>
        <span className="radio-text">
          <label htmlFor="hombre">Hombre</label>
          <input name="genero" type="radio" id="hombre" value="hombre" />
        </span>
        <span className="radio-text">
          <label htmlFor="personalizado">Personalizado</label>
          <input
            name="genero"
            type="radio"
            id="personalizado"
            value="indefinido"
          />
        </span>
      </div>
      <div className="error-container">
        {error ? (
          <p className="error-text">error...</p>
        ) : (
          <p></p> // Si isLoggedIn es false
        )}
        {data ? (
          <p className="error-text">El usuario fue creado con éxito`</p>
        ) : (
          <p></p> // Si isLoggedIn es false
        )}
      </div>
      <div className="select-create-account">
        <Button className={"--create-account"} type={"submit"}>
          Registrate
        </Button>
      </div>

      <NavLink to="/">
        <span>¿Ya tienes una cuenta?</span>
      </NavLink>
      <article>
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
