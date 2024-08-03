import Button from "./Button";
import { useAuth } from "../Hooks/useAuth";

export function ContactChatUser({ id, name, urlImage }) {
  const { newChatActiveContext } = useAuth();

  const openChat = () => {
    newChatActiveContext({
      id: id,
      name: name,
      photo: urlImage,
    });
  };

  return (
    <aside>
      <Button className={"container-contact-btn"} onClick={openChat}>
        <div className="container-contact-inside">
          <img
            src={urlImage}
            className="photo-profile-avatar-contact"
            alt={name}
          />
          <span>{name}</span>
        </div>
      </Button>
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
