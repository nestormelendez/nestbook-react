import Button from "./Button";
import { PostCommentAsideOwnBtn } from "./postCommentAsideOwnBtn";

export function CommentsOwn({
  comment,
  commentator,
  urlImage,
  timeAgo,
  handleClickLikes,
  handleClickComment,
  commentId,
}) {
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

      <PostCommentAsideOwnBtn commentId={commentId}/>
    </div>
  );
}
