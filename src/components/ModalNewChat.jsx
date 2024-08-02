import { useState } from "react";
import Button from "./Button";
import Input, { InputCommets } from "./Input";
import { useAuth } from "../Hooks/useAuth";
import useFetchCreateAccocunt from "../Hooks/useAuthCreateAccount";
import { API_URL } from "../constants";
import { AvatarProfile, AvatarProfileChat } from "./AvatarProfile";
import { SvgPaperPlane, SvgXMark } from "./SvgHomeHeader";
import { handleClick } from "../services/FuntionClick";

export function ModalChatActive() {
  // const [showModal, setShowModal] = useState(false);
  // const [newContent, setNewContent] = useState(content);
  const { userData } = useAuth();
  const [message, setMessage] = useState("");
  // const { isLoading, error, data, fetchData } = useFetchCreateAccocunt();

  // const EditPost = async (e) => {
  //   e.preventDefault();
  //   let token = localStorage.getItem("token");

  //   const raw = JSON.stringify({
  //     content: newContent,
  //   });

  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${token}`);

  //   fetchData({
  //     url: `${API_URL}/posts/${postId}`,
  //     method: "PUT",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   });
  // };

  // if (data) {
  //   console.log("hola");
  //   // location.reload();
  //   editPostFromContext(postId, newContent);
  // }

  // const openModal = () => {
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  //   setNewContent(content);
  // };
  // const handleChangeContent = (e) => {
  //   setNewContent(e.target.value);
  // };

  return (
    <article className="create-chat">
      <section className="input-new-post">
        <section className="chat-header-receiver">
          <div className="chat-profile-receiver">
            <AvatarProfileChat image={userData.photo} />
            <h2 className="post-create-header-name">{userData.name}</h2>
          </div>
          <Button className={"btn delete-post"} onClick={handleClick}>
            <SvgXMark />
          </Button>
        </section>
        <section className="container-chat">
          <div class="messageSend">
            <p class="message-sender-content">
              primer mensaje Esto es un mensaje de emisor
            </p>
            <span class="message-sender-moment">1 minuto</span>
          </div>

          <div class="messageReceived">
            <div class="photo-text-received">
              <div class="photo-profile-avatar-comment">foto</div>
              <p class="message-received-content">
                Esto es un mensaje de receptor
              </p>
            </div>
            <span class="message-received-moment">2 mintos</span>
          </div>
          <div class="messageSend">
            <p class="message-sender-content">Esto es un mensaje de emisor</p>
            <span class="message-sender-moment">1 minuto</span>
          </div>

          <div class="messageReceived">
            <div class="photo-text-received">
              <div class="photo-profile-avatar-comment">foto</div>
              <p class="message-received-content">
                Esto es un mensaje de receptor
              </p>
            </div>
            <span class="message-received-moment">2 mintos</span>
          </div>
          <div class="messageSend">
            <p class="message-sender-content">Esto es un mensaje de emisor</p>
            <span class="message-sender-moment">1 minuto</span>
          </div>

          <div class="messageReceived">
            <div class="photo-text-received">
              <div class="photo-profile-avatar-comment">foto</div>
              <p class="message-received-content">
                Esto es un mensaje de receptor
              </p>
            </div>
            <span class="message-received-moment">2 mintos</span>
          </div>

          <div class="messageSend">
            <p class="message-sender-content">Esto es un mensaje de emisor</p>
            <span class="message-sender-moment">1 minuto</span>
          </div>

          <div class="messageReceived">
            <div class="photo-text-received">
              <div class="photo-profile-avatar-comment">foto</div>
              <p class="message-received-content">
                Esto es un mensaje de receptor
              </p>
            </div>
            <span class="message-received-moment">2 mintos</span>
          </div>
          <div class="messageSend">
            <p class="message-sender-content">Esto es un mensaje de emisor</p>
            <span class="message-sender-moment">1 minuto</span>
          </div>

          <div class="messageReceived">
            <div class="photo-text-received">
              <div class="photo-profile-avatar-comment">foto</div>
              <p class="message-received-content">
                Esto es un mensaje de receptor
              </p>
            </div>
            <span class="message-received-moment">2 mintos</span>
          </div>
          <div class="messageSend">
            <p class="message-sender-content">Esto es un mensaje de emisor</p>
            <span class="message-sender-moment">1 minuto</span>
          </div>

          <div class="messageReceived">
            <div class="photo-text-received">
              <div class="photo-profile-avatar-comment">foto</div>
              <p class="message-received-content">
                Esto es un mensaje de receptor
              </p>
            </div>
            <span class="message-received-moment">2 mintos</span>
          </div>
          <div class="messageSend">
            <p class="message-sender-content">Esto es un mensaje de emisor</p>
            <span class="message-sender-moment">1 minuto</span>
          </div>

          <div class="messageReceived">
            <div class="photo-text-received">
              <div class="photo-profile-avatar-comment">foto</div>
              <p class="message-received-content">
                ultimo mensaje Esto es un mensaje de receptor
              </p>
            </div>
            <span class="message-received-moment">2 mintos</span>
          </div>
        </section>
        <div className="post-header-user">
          <InputCommets
            type={"text"}
            placeholder={`Comentar como ${userData.name}`}
            value={message}
            onChange={handleClick}
          />
          <Button className={"btn --btn-chat"}>
            <SvgPaperPlane width={"2em"} />
          </Button>
        </div>
      </section>
    </article>
  );
}
