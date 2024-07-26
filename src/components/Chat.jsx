import { handleClick } from "../services/FuntionClick";
import { BtnOptionsModal } from "./BtnOptionsModal";
import Button from "./Button";
import { ContactChatUser } from "./Contact-chat-right";
import { SvgSearch } from "./SvgHomeHeader";

export function Chat() {
  return (
    <main className="right">
      <section className="right-fixed">
        <header className="right-fixed-header">
          <span>Contactos</span>
          <div className="flex">
            <Button onClick={handleClick}>
              <SvgSearch />
            </Button>
            <BtnOptionsModal>
              <Button className={"--btn-delete-comment"} onClick={handleClick}>
                Sonido del mensaje
              </Button>
              <Button className={"--btn-delete-comment"} onClick={handleClick}>
                Mostrar contactos
              </Button>
              <Button className={"--btn-delete-comment"} onClick={handleClick}>
                Privacidad y seguridad
              </Button>
            </BtnOptionsModal>
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
