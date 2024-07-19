import { useRef } from "react";
import Button from "./Button";
import { SvgEllipsis } from "./SvgHomeHeader";
import { handleClick } from "../services/FuntionClick";
import { useOutsideClick } from "../Hooks/useOutSideClick";

export function PostCommentAsideOwnBtn() {
  const ref = useRef(null);
  const [isVisibility, setIsVisibility] = useOutsideClick(ref); // Usa el custom hook

  const handleVisibility = () => {
    setIsVisibility(!isVisibility);
  };

  return (
    <div className="post-comment-aside" ref={ref}>
      <Button className={"btn delete-post"} onClick={handleVisibility}>
        <SvgEllipsis />
      </Button>

      <div
        className={`post-comment-aside-own ${isVisibility ? `visibility` : ``}`}
      >
        <Button className={"--btn-edit-comment"} onClick={handleClick}>
          Editar
        </Button>
        <Button className={"--btn-delete-comment"} onClick={handleClick}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
