import Button from "./Button";

export function ContactChatUser({ name, urlImage, onClick }) {
  return (
    <Button className={"container-contact-btn"} onClick={onClick}>
      <div className="container-contact-inside">
        <img
          src={urlImage}
          className="photo-profile-avatar-contact"
          alt={name}
        />
        <span>{name}</span>
      </div>
    </Button>
  );
}

export function OptionsMenuHome({ children, onClick }) {
  return (
    <Button onClick={onClick} className={"container-contact-btn"}>
      <div className="container-contact-inside">{children}</div>
    </Button>
  );
}
