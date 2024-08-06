import { useState } from "react";
import { handleClick } from "../services/FuntionClick";
import Button from "./Button";
import { Chat } from "./Chat";
import { HeaderHome } from "./HeaderHome";
import { Menu } from "./Menu";
import { Posts } from "./Posts";
import { SvgChat } from "./SvgHomeHeader";
import ChatActivesList from "./ChatActiveList";
import { useAuth } from "../Hooks/useAuth";

function Home() {
  const [search, setSearch] = useState("");
  const { connecteUsers } = useAuth();

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
          <Button className={"btn-chat"} onClick={handleClick}>
            <SvgChat />
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Home;
