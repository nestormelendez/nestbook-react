import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";

export const SenderMessage = ({ text, time }) => {
  const { calcularTiempoTranscurrido } = useAuth();
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(
    calcularTiempoTranscurrido(time)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTiempoTranscurrido(calcularTiempoTranscurrido(time));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div className="messageSend">
      <p className="message-sender-content">{text}</p>
      <span className="message-sender-moment">{tiempoTranscurrido}</span>
    </div>
  );
};

export default SenderMessage;
