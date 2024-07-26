import { handleClick } from "../services/FuntionClick";
import { AvatarProfile } from "./AvatarProfile";
import Button from "./Button";
import { SvgImage, SvgSmile, SvgVideo } from "./SvgHomeHeader";
import { ModalNewPost } from "./ModalNewPost.jsx";
import { BtnOptionsModal } from "./BtnOptionsModal.jsx";

export function CreateNewPost() {
  return (
    <article className="content-post">
      <div className="btns-input-post-options">
        <article className="post-header-user-profile">
          <AvatarProfile />
          <ModalNewPost />
          <BtnOptionsModal>
            <Button className={"--btn-hidden-comment"} onClick={handleClick}>
              Público
            </Button>
            <Button className={"--btn-report-comment"} onClick={handleClick}>
              Amigos
            </Button>
            <Button className={"--btn-report-comment"} onClick={handleClick}>
              Amigos excepto...
            </Button>
            <Button className={"--btn-report-comment"} onClick={handleClick}>
              Amigos concretos
            </Button>
            <Button className={"--btn-report-comment"} onClick={handleClick}>
              Solo yo
            </Button>
          </BtnOptionsModal>
        </article>
      </div>

      <div className="btns-input-post-options">
        <Button className={"btn delete-post"} onClick={handleClick}>
          <SvgVideo />
        </Button>
        <Button className={"btn delete-post"} onClick={handleClick}>
          <SvgImage width={"2em"} fill={"#0866ff"} />
        </Button>
        <Button className={"btn delete-post"} onClick={handleClick}>
          <SvgSmile width={"2em"} fill={"#0866ff"} />
        </Button>
      </div>
    </article>
  );
}
