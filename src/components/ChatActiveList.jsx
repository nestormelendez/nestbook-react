import React from "react";
import { ModalChatActive } from "./ModalNewChat";
import { useAuth } from "../Hooks/useAuth";

const ChatActivesList = React.memo(({ connectedUsers = [] }) => {
  const { arrayChatActives } = useAuth();

  console.log(arrayChatActives);
  return (
    <article className="container-chat-active">
      {arrayChatActives.map((chatActive) => (
        <div key={chatActive.id} className="chat-active-item">
          {connectedUsers.includes(chatActive.id) && (
            <div className="online-indicator"></div>
          )}
          <ModalChatActive
            id={chatActive.id}
            name={chatActive.name}
            photo={chatActive.photo}
          />
        </div>
      ))}
    </article>
  );
});

ChatActivesList.displayName = "ChatActivesList";

export default ChatActivesList;
