export const ReceiveMessage = ({ text, time, photo }) => {
  return (
    <div className="messageReceived">
      <div className="photo-text-received">
        <div className="photo-profile-avatar-comment">
          <img className="photo-profile-avatar-comment" 
          src={photo} alt="" />
        </div>
        <p className="message-received-content">{text}</p>
      </div>
      <span className="message-received-moment">{time}</span>
    </div>
  );
};

export default ReceiveMessage;
