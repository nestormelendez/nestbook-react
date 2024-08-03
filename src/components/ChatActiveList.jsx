import React, { useContext } from "react";
import { ModalChatActive } from "./ModalNewChat";
import { useAuth } from "../Hooks/useAuth";

const ChatActivesList = React.memo(() => {
  const { arrayChatActives } = useAuth();

  console.log(arrayChatActives);
  return (
    <article className="container-chat-active">
      {arrayChatActives
        ? arrayChatActives.map((chatActive) => (
            <ModalChatActive
              key={chatActive.id}
              id={chatActive.id}
              name={chatActive.name}
              photo={chatActive.photo}
            />
          ))
        : ""}
    </article>
  );
});

ChatActivesList.displayName = "ChatActivesList";

export default ChatActivesList;
