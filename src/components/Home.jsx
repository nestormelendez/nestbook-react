import { useState } from "react";
import { handleClick } from "../services/FuntionClick";
import Button from "./Button";
import { Chat } from "./Chat";
import { HeaderHome } from "./HeaderHome";
import { Menu } from "./Menu";
import { Posts } from "./Posts";
import { SvgChat, SvgPaperPlane, SvgXMark } from "./SvgHomeHeader";
import { InputCommets } from "./Input";
import { AvatarProfileChat } from "./AvatarProfile";
import { useAuth } from "../Hooks/useAuth";
import { ModalChatActive } from "./ModalNewChat";

function Home() {
  const [search, setSearch] = useState("");
  const [arrayChatActives, setArrayChatActives] = useState([]);

  // HACER UN ARREGLO DE ESTADO PARA PODER CREAR LOS COMPONENTES
  // ModalChatActive Y DE ESTA MANERA RENDERIZARLOS Y HACER UNA
  // FUNCION PARA PASAR POR PROP EL CAMBIO DE ESTE ESTADO Y DE IGUAL
  // FORMA PROGRAMAR SACAR DEL ARREGLO EL CHAT EN ESPECIFICO PARA
  // RENDERIZAR LOS CHAT ACTIVOS

  const { userData } = useAuth();

  return (
    <main className="home">
      <section className="container-home">
        <HeaderHome setSearch={setSearch} />
        <section className="container-home-posts">
          <Menu></Menu>
          <article className="center">
            <Posts search={search} />
          </article>
          <article className="container-chat-active">
            <ModalChatActive />
            <ModalChatActive />
            <ModalChatActive />
          </article>
          <Chat></Chat>
          <Button className={"btn-chat"} onClick={handleClick}>
            <SvgChat />
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Home;
