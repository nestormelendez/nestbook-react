import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { InputCommets } from "./Input";
import { useAuth } from "../Hooks/useAuth";
import { AvatarProfileChat } from "./AvatarProfile";
import { SvgPaperPlane, SvgXMark } from "./SvgHomeHeader";
import SenderMessage from "./SenderMessage";
import ReceiveMessage from "./ReceiveMessage";
import { API_URL } from "../constants";

export function ModalChatActive({ id, name, photo }) {
  const {
    userData,
    deleteChatActiveContext,
    webSocket,
    messages,
    updateChatMessages,
  } = useAuth();
  const chatContainerRef = useRef(null);
  const [message, setMessage] = useState("");

  console.log(userData);
  console.log(id, name, photo);
  console.log(message);
  console.log(messages);

  useEffect(() => {
    if (chatContainerRef.current) {
      console.log(chatContainerRef);
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const response = await fetch(`${API_URL}/chats/${id}`, {
          headers: myHeaders,
        });

        if (!response.ok) {
          throw new Error(`Error al obtener los mensajes: ${response.status}`);
        }

        const data = await response.json();
        updateChatMessages(userData.id, id, data);
        console.log(data);
        console.log(userData.id);
        console.log(id);
      } catch (error) {
        console.error("Error al cargar los mensajes:", error);
      }
    };

    fetchMessages();
  }, [id, userData.id]);

  useEffect(() => {
    if (webSocket) {
      const messageListener = (event) => {
        const newMessage = JSON.parse(event.data);

        if (newMessage.chatId === id) {
          console.log(messages);
          updateChatMessages(id, newMessage);
        }
      };

      webSocket.addEventListener("message", messageListener);
      return () => {
        webSocket.removeEventListener("message", messageListener);
      };
    }
  }, [id, webSocket]);

  const handleOutChatActive = () => {
    deleteChatActiveContext(id);
  };
  const handleChangeInputValue = (e) => {
    setMessage(e.target.value);
    console.log(webSocket);
    console.log(messages);
  };
  const handleSendMessage = async () => {
    if (webSocket && webSocket.readyState === webSocket.OPEN && message) {
      const newMessage = {
        type: "message",
        token: localStorage.getItem("token"),
        text: message,
        toUserId: id,
      };

      try {
        webSocket.send(JSON.stringify(newMessage));
        console.log(newMessage);
        updateChatMessages(userData.id, id, newMessage);

        setMessage("");
        // setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Error al enviar o guardar el mensaje:", error);
      }
    }
    console.log(webSocket);
    console.log(messages);
  };

  return (
    <article className="create-chat">
      <section className="input-new-post">
        <section className="chat-header-receiver">
          <div className="chat-profile-receiver">
            <AvatarProfileChat image={photo} />
            <h2 className="post-create-header-name">{name}</h2>
          </div>
          <Button className={"btn delete-post"} onClick={handleOutChatActive}>
            <SvgXMark />
          </Button>
        </section>
        <section className="container-chat" ref={chatContainerRef}>
          {messages[[userData.id, id].sort().join("-")]?.map((msg, index) =>
            msg.toUserId === id ? (
              <SenderMessage key={index} text={msg.text} time={msg.createdAt} />
            ) : (
              <ReceiveMessage
                key={index}
                text={msg.text}
                time={msg.createdAt}
                photo={`${photo}`}
              />
            )
          )}
        </section>

        <div className="post-header-user">
          <InputCommets
            type={"text"}
            placeholder={`Comentar como ${userData.name}`}
            value={message}
            onChange={handleChangeInputValue}
          />
          <Button className={"btn --btn-chat"} onClick={handleSendMessage}>
            <SvgPaperPlane width={"2em"} />
          </Button>
        </div>
      </section>
    </article>
  );
}
