const Button = ({ children, type, onClick, disabled, className }) => {
  // children: El texto o contenido del botón
  // type: Tipo de botón (button, submit, reset)
  // onClick: Función que se ejecuta al hacer clic
  // disabled: Indica si el botón está deshabilitado
  // className: Clase CSS adicional para estilos personalizados

  return (
    <button
      type={type || "button"} // Tipo predeterminado es 'button'
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`} // Combina la clase 'button' con la clase personalizada
    >
      {children}
    </button>
  );
};

export default Button;
