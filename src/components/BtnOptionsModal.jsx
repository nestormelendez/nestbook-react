import { useEffect, useRef } from "react";
import Button from "./Button";
import { SvgEllipsis } from "./SvgHomeHeader";

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
