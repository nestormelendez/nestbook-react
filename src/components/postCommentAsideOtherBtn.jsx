import { useRef } from "react";
import Button from "./Button";
import { SvgEllipsis } from "./SvgHomeHeader";
import { handleClick } from "../services/FuntionClick";
import { useOutsideClick } from "../Hooks/useOutSideClick";

export function PostCommentAsideOtherBtn() {
  const ref = useRef(null);
  const [isVisibility, setIsVisibility] = useOutsideClick(ref);

  const handleVisibility = () => {
    setIsVisibility(!isVisibility);
  };

  return (
    <div div className="post-comment-aside" ref={ref}>
      <Button className={"btn delete-post"} onClick={handleVisibility}>
        <SvgEllipsis />
      </Button>

      <div
        className={`post-comment-aside-other ${
          isVisibility ? `visibility` : ``
        }`}
      >
        <Button className={"--btn-hidden-comment"} onClick={handleClick}>
          Ocultar comentario
        </Button>
        <Button className={"--btn-report-comment"} onClick={handleClick}>
          Reportar comentarionar
        </Button>
      </div>
    </div>
  );
}
