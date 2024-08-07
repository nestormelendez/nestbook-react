import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { useAuth } from "../Hooks/useAuth";
import useFetchCreateAccocunt from "../Hooks/useAuthCreateAccount";
import { BtnOptionsModal } from "./BtnOptionsModal";
import Button from "./Button";
import { ModalEditComment } from "./ModalEditComment";

export function CommentsOwn({
  comment,
  commentator,
  urlImage,
  timeAgo,
  handleClickLikes,
  handleClickComment,
  commentId,
  postId,
}) {
  const { isLoading, error, data, fetchData } = useFetchCreateAccocunt();

  const { deleteCommentFromContext } = useAuth();

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

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
    // location.reload();
    deleteCommentFromContext(postId, commentId);
  }
  const { calcularTiempoTranscurrido } = useAuth();

  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(
    calcularTiempoTranscurrido(timeAgo)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTiempoTranscurrido(calcularTiempoTranscurrido(timeAgo));
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia al desmontar
  }, [timeAgo]); // Actualiza si timeAgoPost cambia

  const handleToggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };
  return (
    <div className="post-header-user">
      <section className="photo-profile-avatar-comment-left">
        <div className="comment-header">
          <img
            className="photo-profile-avatar-comment"
            src={`${API_URL}/${urlImage}`}
            alt={commentator}
          />
          <div className="data-user-post">
            <article className="post-comment-header">
              <h2> {commentator}</h2>
              <div className="post-comment">
                <span>{comment}</span>
              </div>
            </article>
          </div>
          <BtnOptionsModal
            isVisible={isOptionsVisible}
            onVisibilityChange={setIsOptionsVisible}
          >
            <ModalEditComment
              content={comment}
              commentId={commentId}
              onModalClick={handleToggleOptions}
            />
            <Button className={"--btn-delete-comment"} onClick={DeleteComment}>
              Eliminar
            </Button>
            {isLoading ? <p className="cargando">Cargando...</p> : ""}
            {error ? <p className="error-text">Da error </p> : ""}
          </BtnOptionsModal>
        </div>

        <div className="comment-footer">
          <span>{tiempoTranscurrido}</span>
          <Button className={"btn"} onClick={handleClickLikes}>
            <span>Me gusta</span>
          </Button>
          <Button className={"btn"} onClick={handleClickComment}>
            <span>Responder</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
