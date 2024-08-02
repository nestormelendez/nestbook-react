import { useState } from "react";
import Button from "./Button";
import { AvatarProfileChat } from "./AvatarProfile";
import { InputCommets } from "./Input";
import { useAuth } from "../Hooks/useAuth";
import { SvgPaperPlane, SvgXMark } from "./SvgHomeHeader";

export function ContactChatUser({ name, urlImage }) {
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { userData } = useAuth();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleChangeContent = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <aside>
      <Button className={"container-contact-btn"} onClick={openModal}>
        <div className="container-contact-inside">
          <img
            src={urlImage}
            className="photo-profile-avatar-contact"
            alt={name}
          />
          <span>{name}</span>
        </div>
      </Button>
      {showModal ? (
        <article className="create-chat">
          <section className="input-new-post" encType="multipart/form-data">
            <section className="chat-header-receiver">
              <div className="chat-profile-receiver">
                <AvatarProfileChat image={urlImage} />
                <h2 className="post-create-header-name">{name}</h2>
              </div>
              <Button className={"btn delete-post"} onClick={closeModal}>
                <SvgXMark />
              </Button>
            </section>
            <section className="container-chat">
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
              <article>mensajes de chat</article>
            </section>
            <div className="post-header-user">
              <InputCommets
                type={"text"}
                placeholder={`Comentar como ${userData.name}`}
                value={newMessage}
                onChange={handleChangeContent}
              />
              <Button className={"btn --btn-chat"}>
                <SvgPaperPlane width={"2em"} />
              </Button>
            </div>
          </section>
        </article>
      ) : (
        ""
      )}
    </aside>
  );
}

export function OptionsMenuHome({ children, onClick }) {
  return (
    <Button onClick={onClick} className={"container-contact-btn"}>
      <div className="container-contact-inside">{children}</div>
    </Button>
  );
}
