import { useState } from "react";
import { Chat } from "./Chat";
import { HeaderHome } from "./HeaderHome";
import { Menu } from "./Menu";
import { Posts } from "./Posts";
import ChatActivesList from "./ChatActiveList";
import { useAuth } from "../Hooks/useAuth";
import { BtnModalSearchContact } from "./BtnOptionsModal";
import { ModalSearchContact } from "./ModalSearchContact";

function Home() {
  const [search, setSearch] = useState("");
  const { connecteUsers } = useAuth();
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const handleToggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  return (
    <main className="home">
      <section className="container-home">
        <HeaderHome setSearch={setSearch} />
        <section className="container-home-posts">
          <Menu />
          <article className="center">
            <Posts search={search} />
          </article>
          <ChatActivesList connecteUsers={connecteUsers} />
          <Chat />
          <BtnModalSearchContact
            isVisible={isOptionsVisible}
            onVisibilityChange={setIsOptionsVisible}
          >
            <ModalSearchContact onModalClick={handleToggleOptions} />
          </BtnModalSearchContact>
        </section>
      </section>
    </main>
  );
}

export default Home;
