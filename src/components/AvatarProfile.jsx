import { API_URL } from "../constants";
import { useAuth } from "../Hooks/useAuth";
import Button from "./Button";
import { SvgRightFromBracket } from "./SvgHomeHeader";

export function AvatarProfileLogout({ onModalClick }) {
  const { logout } = useAuth();

  const handleOut = () => {
    logout();
    onModalClick();
  };

  return (
    <section className="avatar-profile-logout">
      <Button className={"btn-out"} onClick={handleOut}>
        <SvgRightFromBracket fill={"#0866ff"} className={"menu-option-out"} />
        <span>Cerrar sésion</span>
      </Button>
    </section>
  );
}

export function AvatarProfile() {
  const { userData } = useAuth();

  return (
    <section>
      <Button>
        <img
          className="photo-profile-avatar-contact"
          src={`${API_URL}/${userData.photo}`}
          alt=""
        />
      </Button>
    </section>
  );
}

export function AvatarProfileOther({ image }) {
  console.log(image);
  return (
    <section>
      <Button>
        <img
          className="photo-profile-avatar-contact"
          src={`${API_URL}/${image}`}
          alt={image}
        />
      </Button>
    </section>
  );
}

export function AvatarProfileChat({ image }) {
  console.log(image);
  return (
    <section>
      <Button>
        <img className="photo-profile-avatar-contact" src={image} alt={image} />
      </Button>
    </section>
  );
}
