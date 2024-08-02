import { API_URL } from "../constants";
import { useAuth } from "../Hooks/useAuth";
import Button from "./Button";

export function AvatarProfileLogout() {
  const { logout, userData } = useAuth();

  return (
    <section>
      <Button onClick={logout}>
        <img
          className="photo-profile-avatar-contact"
          src={`${API_URL}/${userData.photo}`}
          alt=""
        />
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
        <img className="photo-profile-avatar-contact" src={`${API_URL}/${image}`} alt={image} />
      </Button>
    </section>
  );
}
