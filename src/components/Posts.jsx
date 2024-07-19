import { handleClick } from "../services/FuntionClick";
import { AvatarProfile } from "./AvatarProfile";
import Button from "./Button";
import { InputCommets } from "./Input";
import {
  SvgComment,
  SvgCommentCount,
  SvgEllipsis,
  SvgPaperPlane,
  SvgShare,
  SvgThumbsUp,
  SvgXMark,
} from "./SvgHomeHeader";
import { PostCommentAsideOwnBtn } from "./postCommentAsideOwnBtn";
import { PostCommentAsideOtherBtn } from "./postCommentAsideOtherBtn";

export function Posts() {
  return (
    <main className="container-post-header">
      <article className="content-post">
        <header className="post-header">
          <div className="post-header-user">
            <article className="post-header-user-profile">
              <AvatarProfile />
              <div className="data-user-post">
                <h2>Nestor</h2>
                <span>1 d</span>
              </div>
            </article>
            <div className="btns-options">
            <PostCommentAsideOwnBtn />
            <PostCommentAsideOtherBtn />
              <Button className={"btn delete-post"} onClick={handleClick}>
                <SvgXMark />
              </Button>
            </div>
          </div>
        </header>
        <div className="container">
          <span className="post">
            <h3>La mejor familia del mundo !!!</h3>
            <img className="img-post" src="./src\assets\nestor.jpg" alt="" />
          </span>
          <div className="post-likes-comments">
            <div className="flex">
              <SvgThumbsUp width={"1.3em"} fill={"#0866ff"} />
              <h3>10</h3>
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
          <div className="post-header-user">
            <section className="photo-profile-avatar-comment-left">
              <div className="photo-profile-avatar-comment">
                <span>L</span>
              </div>
              <div className="data-user-post">
                <article className="post-comment-header">
                  <h2> Leonel</h2>
                  <div className="post-comment">
                    <span>
                      esto es un Comentario esto es un Comentario esto es un
                      Comentario esto es un Comentario esto es un Comentario
                      esto es un Comentario esto es un Comentarioesto es un
                      Comentarioesto es un Comentarioesto es un Comentario esto
                      es un Comentario esto es un Comentario esto es un
                      Comentario esto es un Comentario esto es un Comentario
                      esto es un Comentario esto es un Comentarioesto es un
                      Comentario
                    </span>
                  </div>
                </article>
                <div className="post-comment-footer">
                  <span>Hace 4 minutos</span>
                  <Button className={"btn"} onClick={handleClick}>
                    <span>Me gusta</span>
                  </Button>
                  <Button className={"btn"} onClick={handleClick}>
                    <span>Responder</span>
                  </Button>
                </div>
              </div>
            </section>

            <PostCommentAsideOwnBtn />
            <PostCommentAsideOtherBtn />
          </div>

          <div className="post-header-user">
            <section className="photo-profile-avatar-comment-left">
              <div className="photo-profile-avatar-comment">
                <span>L</span>
              </div>
              <div className="data-user-post">
                <article className="post-comment-header">
                  <h2> Leonel</h2>
                  <div className="post-comment">
                    <span>
                      esto es un Comentario esto es un Comentario esto es un
                      Comentario esto es un Comentario esto es un Comentario
                      esto es un Comentario esto es un Comentarioesto es un
                      Comentarioesto es un Comentarioesto es un Comentario esto
                    </span>
                  </div>
                </article>
                <div className="post-comment-footer">
                  <span>Hace 4 minutos</span>
                  <Button className={"btn"} onClick={handleClick}>
                    <span>Me gusta</span>
                  </Button>
                  <Button className={"btn"} onClick={handleClick}>
                    <span>Responder</span>
                  </Button>
                </div>
              </div>
            </section>

            <PostCommentAsideOwnBtn />
            <PostCommentAsideOtherBtn />
          </div>
          <div className="post-header-user">
            <section className="photo-profile-avatar-comment-left">
              <div className="photo-profile-avatar-comment">
                <span>L</span>
              </div>
              <div className="data-user-post">
                <article className="post-comment-header">
                  <h2> Leonel</h2>
                  <div className="post-comment">
                    <span>esto es un Comentario esto Comentario</span>
                  </div>
                </article>
                <div className="post-comment-footer">
                  <span>Hace 4 minutos</span>
                  <Button className={"btn"} onClick={handleClick}>
                    <span>Me gusta</span>
                  </Button>
                  <Button className={"btn"} onClick={handleClick}>
                    <span>Responder</span>
                  </Button>
                </div>
              </div>
            </section>

            <PostCommentAsideOwnBtn />
            <PostCommentAsideOtherBtn />
          </div>

          <div className="post-contents">
            <div className="post-header-user">
              <AvatarProfile />
              <InputCommets
                type={"text"}
                placeholder={"Comentar como Nestor"}
                onChange={handleClick}
              />
              <Button className={"btn --btn-comment"} onClick={handleClick}>
                <SvgPaperPlane />
              </Button>
            </div>
          </div>
        </article>
      </article>
    </main>
  );
}
