import { useRef } from "react";
import { useOutsideClick } from "../Hooks/useOutSideClick";
import Button from "./Button";
import { SvgEllipsis } from "./SvgHomeHeader";

export function BtnOptionsModal({ children }) {
  const ref = useRef(null);
  const [isVisibility, setIsVisibility] = useOutsideClick(ref);

  const handleVisibility = () => {
    setIsVisibility(!isVisibility);
  };

  return (
    <main div className="post-comment-aside" ref={ref}>
      <Button className={"btn delete-post"} onClick={handleVisibility}>
        <SvgEllipsis />
      </Button>
      <div
        className={`post-comment-aside-other ${
          isVisibility ? `visibility` : ``
        }`}
      >
        {children}
      </div>
    </main>
  );
}
