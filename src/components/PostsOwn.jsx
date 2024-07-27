import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { handleClick } from "../services/FuntionClick";
import { AvatarProfile } from "./AvatarProfile";
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
import useFetchCreateAccocunt from "../Hooks/useAuthCreateAccount";
import { API_URL } from "../constants";
import { BtnOptionsModal } from "./BtnOptionsModal";
import { ModalEditPost } from "./ModalEditPost";

export function PostOwn({
  children,
  publisherName,
  timeAgoPost,
  postContent,
  urlImagePublisher,
  postId,
}) {
  console.log(timeAgoPost);

  const {
    userData,
    deletePostFromContext,
    CreateNewComment,
    calcularTiempoTranscurrido,
  } = useAuth();

  const [inputValue, setInputValue] = useState("");
  // const [tiempoTranscurrido, setTiempoTranscurrido] = useState(timeAgoPost);

  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(
    calcularTiempoTranscurrido(timeAgoPost)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTiempoTranscurrido(calcularTiempoTranscurrido(timeAgoPost));
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia al desmontar
  }, [timeAgoPost]); // Actualiza si timeAgoPost cambia

  const { isLoading, error, data, fetchData } = useFetchCreateAccocunt();

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
    deletePostFromContext(postId);
    // location.reload();
  }

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const handleCreateComment = () => {
    CreateNewComment(postId, inputValue);
    setInputValue("");
  };

  return (
    <article className="content-post">
      <header className="post-header">
        <div className="post-header-user">
          <article className="post-header-profile">
            <AvatarProfile />
            <div className="data-user-post">
              <h2>{publisherName}</h2>
              <span>{tiempoTranscurrido}</span>
            </div>
          </article>
          <div className="btns-options">
            <BtnOptionsModal>
              <ModalEditPost postId={postId} content={postContent} />
              <Button className={"--btn-delete-comment"} onClick={DeletePost}>
                Eliminar
              </Button>
              {isLoading ? <p className="cargando">Cargando...</p> : ""}
              {error ? <p className="error-text">Da error </p> : ""}
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
            OWN {postId} {publisherName}
          </h3>
          {/* Colcar una condicion aqui si hay o no post */}
          <img className="img-post" src={urlImagePublisher} alt={postContent} />
        </span>
        <div className="post-likes-comments">
          <div className="flex">
            <SvgThumbsUp width={"1.3em"} fill={"#0866ff"} />
            <h3>10</h3>
          </div>
          <div className="flex">
            {isLoading ? <p className="cargando">Cargando...</p> : <p></p>}
            {error ? <p className="error-text">Da error...</p> : <p></p>}
          </div>
          <div className="flex">
            <SvgCommentCount width={"1.3em"} fill={"#b0b2b5"} />
            <h3>5</h3>
          </div>
        </div>
      </div>

      <footer className="btns-likes-comments">
        <Button className={"btn --btn-post btn-like"} onClick={handleClick}>
          <SvgThumbsUp width={"1.4em"} fill={"#b0b2b5"} />
          <span>Me gusta</span>
        </Button>

        <Button className={"btn --btn-post btn-like"} onClick={handleClick}>
          <SvgComment width={"1.4em"} fill={"#b0b2b5"} />
          <span>Comentar</span>
        </Button>

        <Button className={"btn --btn-post btn-like"} onClick={handleClick}>
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
