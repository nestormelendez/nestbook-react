import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { handleClick } from "../services/FuntionClick";
import { AvatarProfile, AvatarProfileOther } from "./AvatarProfile";
import Button from "./Button";
import { InputCommets } from "./Input";
import {
  SvgComment,
  SvgCommentCount,
  SvgPaperPlane,
  SvgShare,
  SvgThumbsUp,
  SvgXMark,
} from "./SvgHomeHeader";

import { BtnOptionsModal } from "./BtnOptionsModal";

export function PostOther({
  children,
  publisherName,
  timeAgoPost,
  postContent,
  urlImagePublisher,
  postId,
  publisherPhoto,
  commentCount,
  postLikes,
  likeId,
}) {
  console.log(commentCount);

  const {
    userData,
    CreateNewComment,
    calcularTiempoTranscurrido,
    createNewLike,
    deleteLikeAction,
  } = useAuth();

  const [inputValue, setInputValue] = useState("");

  const [inputComment, setInputComment] = useState(false);

  const [isLiked, setIsLiked] = useState(false);

  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(
    calcularTiempoTranscurrido(timeAgoPost)
  );

  useEffect(() => {
    const userHasLiked = likeId !== null;
    setIsLiked(userHasLiked);
  }, [isLiked]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTiempoTranscurrido(calcularTiempoTranscurrido(timeAgoPost));
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia al desmontar
  }, [timeAgoPost]); // Actualiza si timeAgoPost cambia

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const handleCreateComment = () => {
    CreateNewComment(postId, inputValue);
    setInputValue("");
  };

  const handleLikes = async (e) => {
    createNewLike(postId);
  };

  const handleIDontLikes = async (e) => {
    setIsLiked(false);
    deleteLikeAction(postId, likeId);
  };
  useEffect(() => {
    if (inputComment) {
      setTimeout(() => {
        const inputRef = document.getElementById(`input-comment-${postId}`);
        if (inputRef) {
          inputRef.focus();
        }
      }, 0);
    }
  }, [inputComment, postId]);

  const handleInputCommet = () => {
    setInputComment(true);
  };

  return (
    <article className="content-post">
      <header className="post-header">
        <div className="post-header-user">
          <article className="post-header-profile">
            <AvatarProfileOther image={publisherPhoto} />

            <div className="data-user-post">
              <h2>{publisherName}</h2>
              <span>{tiempoTranscurrido}</span>
            </div>
          </article>
          <div className="btns-options">
            <BtnOptionsModal>
              <Button className={"--btn-hidden-comment"} onClick={handleClick}>
                Ocultar comentario
              </Button>
              <Button className={"--btn-report-comment"} onClick={handleClick}>
                Reportar comentario
              </Button>
            </BtnOptionsModal>
            <Button className={"btn delete-post"} onClick={handleClick}>
              <SvgXMark />
            </Button>
          </div>
        </div>
      </header>

      <div className="container">
        <span className="post">
          <h3>{postContent}</h3>
          <h3>
            OTHER {postId} {publisherName}
          </h3>
          {/* Colcar una condicion aqui si hay o no post */}
          <img className="img-post" src={urlImagePublisher} alt={postContent} />
        </span>
        <div className="post-likes-comments">
          <div className="flex">
            <SvgThumbsUp width={"1.3em"} fill={"#0866ff"} />
            <h3>{postLikes ? postLikes : 0}</h3>
          </div>
          <div className="flex"></div>
          <div className="flex">
            <SvgCommentCount width={"1.3em"} fill={"#b0b2b5"} />
            <h3>{commentCount}</h3>
          </div>
        </div>
      </div>

      <footer className="btns-likes-comments">
        <Button
          className={"btn --btn-post "}
          onClick={isLiked ? handleIDontLikes : handleLikes}
        >
          <SvgThumbsUp width={"1.4em"} fill={isLiked ? "#084cdf" : "#b0b2b5"} />
          <span className={isLiked ? "me-gusta" : ""}>
            {isLiked ? "Te gusta" : "Me gusta"}
          </span>
        </Button>

        <Button className={"btn --btn-post"} onClick={handleInputCommet}>
          <SvgComment width={"1.4em"} fill={"#b0b2b5"} />
          <span>Comentar</span>
        </Button>

        <Button className={"btn --btn-post"} onClick={handleClick}>
          <SvgShare width={"1.4em"} fill={"#b0b2b5"} />
          <span>Compartir</span>
        </Button>
      </footer>

      <article className="container-comment">
        {children}

        <div className="post-contents">
          <div className="post-header-user">
            <AvatarProfile />
            <InputCommets
              type={"text"}
              placeholder={`Comentar como ${userData.name}`}
              value={inputValue}
              onChange={handleInputValue}
              id={`input-comment-${postId}`}
            />
            <Button
              className={"btn --btn-comment"}
              onClick={handleCreateComment}
            >
              <SvgPaperPlane />
            </Button>
          </div>
        </div>
      </article>
    </article>
  );
}
