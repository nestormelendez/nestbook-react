import { handleClick } from "../services/FuntionClick";
import Button from "./Button";
import { ContactChatUser } from "./Contact-chat-right";
import { PostCommentAsideOwnBtn } from "./postCommentAsideOwnBtn";
import { SvgSearch } from "./SvgHomeHeader";


export function Chat() {
  return (
    <main className="right">
      <section className="right-fixed">
        <header className="right-fixed-header">
          <span>Contatos</span>
          <div className="flex">
            <Button onClick={handleClick}>
              <SvgSearch />
            </Button>
            <PostCommentAsideOwnBtn />
          </div>
        </header>
        <aside className="container-contact">
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
          <ContactChatUser
            name={"Nestor Melendez"}
            urlImage={"./src/assets/nestor.jpg"}
            onClick={handleClick}
          />
        </aside>
      </section>
    </main>
  );
}
