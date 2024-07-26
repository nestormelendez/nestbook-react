import { API_URL } from "../constants";
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
}) {
  const { isLoading, error, data, fetchData } = useFetchCreateAccocunt();

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
    <div className="post-header-user">
      <section className="photo-profile-avatar-comment-left">
        <img
          className="photo-profile-avatar-comment"
          src={urlImage}
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
            <span>{timeAgo}</span>
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
        <ModalEditComment content={comment} commentId={commentId} />
        <Button className={"--btn-delete-comment"} onClick={DeleteComment}>
          Eliminar
        </Button>
        {isLoading ? <p className="cargando">Cargando...</p> : ""}
        {error ? <p className="error-text">Da error </p> : ""}
      </BtnOptionsModal>
    </div>
  );
}
