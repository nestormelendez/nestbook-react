import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";

export const ReceiveMessage = ({ text, time, photo }) => {
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
    <div className="messageReceived">
      <div className="photo-text-received">
        <div className="photo-profile-avatar-comment">
          <img className="photo-profile-avatar-comment" src={photo} alt="" />
        </div>
        <p className="message-received-content">{text}</p>
      </div>
      <span className="message-received-moment">{tiempoTranscurrido}</span>
    </div>
  );
};

export default ReceiveMessage;
