import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { useAuth } from "../Hooks/useAuth";
import { handleClick } from "../services/FuntionClick";
import { BtnOptionsModal } from "./BtnOptionsModal";
import Button from "./Button";

export function CommentsOther({
  comment,
  commentator,
  urlImage,
  timeAgo,
  handleClickLikes,
  handleClickComment,
}) {
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

  return (
    <div className="post-header-user">
      <section className="photo-profile-avatar-comment-left">
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

          <div className="post-comment-footer">
            <span>{tiempoTranscurrido}</span>
            <Button className={"btn"} onClick={handleClickLikes}>
              <span>Me gusta</span>
            </Button>
            <Button className={"btn"} onClick={handleClickComment}>
              <span>Responder</span>
            </Button>
          </div>
        </div>
      </section>

      <BtnOptionsModal>
        <Button className={"--btn-hidden-comment"} onClick={handleClick}>
          Ocultar comentario
        </Button>
        <Button className={"--btn-report-comment"} onClick={handleClick}>
          Reportar comentarionar
        </Button>
      </BtnOptionsModal>
    </div>
  );
}
