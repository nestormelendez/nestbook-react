export const SenderMessage = ({ text, time }) => {
  return (
    <div className="messageSend">
      <p className="message-sender-content">{text}</p>
      <span className="message-sender-moment">{time}</span>
    </div>
  );
};

export default SenderMessage;
