import { useRef } from "react";
import Button from "./Button";
import { SvgEllipsis } from "./SvgHomeHeader";
import { handleClick } from "../services/FuntionClick";
import { useOutsideClick } from "../Hooks/useOutSideClick";
import { API_URL } from "../constants";
import useFetchCreateAccocunt from "../Hooks/useAuthCreateAccount";

export function PostCommentAsideOwnBtn({ postId, commentId }) {
  const ref = useRef(null);
  const [isVisibility, setIsVisibility] = useOutsideClick(ref); // Usa el custom hook

  const { isLoading, error, data, fetchData } = useFetchCreateAccocunt();
  const handleVisibility = () => {
    setIsVisibility(!isVisibility);
  };

  const DeletePost = async (e) => {
    e.preventDefault();
    const positive = confirm(`Estas seguro de eliminar el post ${postId}?`);
    if (positive) {
      let token = localStorage.getItem("token");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      fetchData({
        url: `${API_URL}/posts/${postId}`,
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      });
    }
  };
  if (data) {
    location.reload();
  }

  const DeleteComment = async (e) => {
    e.preventDefault();
    const positive = confirm(
      `Estas seguro de eliminar el comentario ${commentId}?`
    );
    if (positive) {
      let token = localStorage.getItem("token");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      fetchData({
        url: `${API_URL}/comments/${commentId}`,
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      });
    }
  };
  if (data) {
    location.reload();
  }

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
        <Button
          className={"--btn-delete-comment"}
          onClick={postId ? DeletePost : DeleteComment}
        >
          Eliminar
        </Button>
      </div>
      {isLoading ? <p className="cargando">Cargando...</p> : ""}
      {error ? <p className="error-text">Da error </p> : ""}
    </div>
  );
}
