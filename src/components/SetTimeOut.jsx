import { useState, useEffect } from "react";

const TimeoutComponent = ({time, initialMessage,  secondaryMessage}) => {
    const [message, setMessage] = useState(
      `${initialMessage}`
    );

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setMessage(`${secondaryMessage}`);
      }, `${time}`); // 3000 milisegundos = 3 segundos

      // Limpia el timeout cuando el componente se desmonta
      return () => clearTimeout(timeoutId);
    },); // El useEffect se ejecuta solo una vez al montar el componente

    return (
      <div>
        <h5 className="error-text">{message}</h5>
      </div>
    );
  };
export default TimeoutComponent;
