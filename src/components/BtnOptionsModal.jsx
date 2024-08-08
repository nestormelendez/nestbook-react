import { useEffect, useRef } from "react";
import Button from "./Button";
import { SvgChat, SvgEllipsis } from "./SvgHomeHeader";
import { API_URL } from "../constants";
import { useAuth } from "../Hooks/useAuth";

export function BtnOptionsModal({ children, isVisible, onVisibilityChange }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && isVisible) {
        onVisibilityChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onVisibilityChange]);

  return (
    <main className="post-comment-aside" ref={ref}>
      <Button
        className={"delete-post"}
        onClick={() => onVisibilityChange(!isVisible)}
      >
        <SvgEllipsis />
      </Button>
      <section
        className={`post-comment-aside-other ${isVisible ? `visibility` : ``}`}
      >
        {children}
      </section>
    </main>
  );
}

export function BtnOptionsModalOut({
  children,
  isVisible,
  onVisibilityChange,
}) {
  const ref = useRef(null);
  const { userData } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && isVisible) {
        onVisibilityChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onVisibilityChange]);

  return (
    <main className="post-comment-aside" ref={ref}>
      <Button
        className={"delete-post"}
        onClick={() => onVisibilityChange(!isVisible)}
      >
        <img
          className="photo-profile-avatar-contact"
          src={`${API_URL}/${userData.photo}`}
          alt=""
        />
      </Button>
      <section
        className={`post-comment-aside-other ${
          isVisible ? `visibility-out` : ``
        }`}
      >
        {children}
      </section>
    </main>
  );
}

export function BtnModalSearchContact({
  children,
  isVisible,
  onVisibilityChange,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && isVisible) {
        onVisibilityChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onVisibilityChange]);

  return (
    <main className="post-comment-aside" ref={ref}>
      <Button
        className={"btn-chat"}
        onClick={() => onVisibilityChange(!isVisible)}
      >
        <SvgChat />
      </Button>
      <section
        className={`post-comment-aside-other ${
          isVisible ? `visibility-out` : ``
        }`}
      >
        {children}
      </section>
    </main>
  );
}
