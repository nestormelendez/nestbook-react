import { handleClick } from "../services/FuntionClick";
import Button from "./Button";
import { Chat } from "./Chat";
import { HeaderHome } from "./HeaderHome";
import { Menu } from "./Menu";
import { Posts } from "./Posts";
import { SvgChat } from "./SvgHomeHeader";

export function Home() {
  return (
    <main className="home">
      <section className="container-home">
        <HeaderHome />
        <section className="container-home-posts">
          <Menu></Menu>
          <article className="center">
            <Posts />
            <Posts />
            <Posts />
            <Posts />
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
