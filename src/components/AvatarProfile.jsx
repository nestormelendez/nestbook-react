import { useAuth } from "../Hooks/useAuth";
import Button from "./Button";

export function AvatarProfileLogout() {
  const { logout } = useAuth();
  return (
    <section>
      <Button onClick={logout}>
        <img
          className="photo-profile-avatar-contact"
          src="./src/assets/nestor.jpg"
          alt=""
        />
      </Button>
    </section>
  );
}

export function AvatarProfile() {
  return (
    <section>
      <Button>
        <img
          className="photo-profile-avatar-contact"
          src="./src/assets/nestor.jpg"
          alt=""
        />
      </Button>
    </section>
  );
}
