export const Input = ({ type, placeholder, name, value, onChange, error }) => {
  // type: Tipo de input (text, email, password, etc.)
  // placeholder: Texto de sugerencia dentro del input
  // value: Valor actual del input
  // onChange: Función que se ejecuta al cambiar el valor del input
  // error: Mensaje de error (opcional)
  // label: Etiqueta del input (opcional)

  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`input-text ${error ? "error" : ""}`} // Agrega la clase 'error' si hay un error
    />
  );
};
export const InputCommets = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  id,
}) => {
  // type: Tipo de input (text, email, password, etc.)
  // placeholder: Texto de sugerencia dentro del input
  // value: Valor actual del input
  // onChange: Función que se ejecuta al cambiar el valor del input
  // error: Mensaje de error (opcional)
  // label: Etiqueta del input (opcional)

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`input-comment ${error ? "error" : ""}`} // Agrega la clase 'error' si hay un error
      required={true}
    />
  );
};
export const InputSearch = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
}) => {
  // type: Tipo de input (text, email, password, etc.)
  // placeholder: Texto de sugerencia dentro del input
  // value: Valor actual del input
  // onChange: Función que se ejecuta al cambiar el valor del input
  // error: Mensaje de error (opcional)
  // label: Etiqueta del input (opcional)

  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`input-search ${error ? "error" : ""}`} // Agrega la clase 'error' si hay un error
    />
  );
};

export const InputCreateAccount = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  label,
}) => {
  // type: Tipo de input (text, email, password, etc.)
  // placeholder: Texto de sugerencia dentro del input
  // value: Valor actual del input
  // onChange: Función que se ejecuta al cambiar el valor del input
  // error: Mensaje de error (opcional)
  // label: Etiqueta del input (opcional)

  return (
    <div className="input-container">
      {label && <label htmlFor={label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input-text ${error ? "error" : ""}`} // Agrega la clase 'error' si hay un error
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Input;
