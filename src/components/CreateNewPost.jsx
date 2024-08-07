import { handleClick } from "../services/FuntionClick";
import { AvatarProfile } from "./AvatarProfile";
import Button from "./Button";
import { SvgImage, SvgSmile, SvgVideo } from "./SvgHomeHeader";
import { ModalNewPost } from "./ModalNewPost.jsx";
import { BtnOptionsModal } from "./BtnOptionsModal.jsx";
import { useState } from "react";

export function CreateNewPost() {
  
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const handleToggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };
  return (
    <article className="content-post">
      <div className="btns-input-post-options">
        <article className="post-header-user-profile">
          <AvatarProfile />
          <ModalNewPost />
          <BtnOptionsModal
           isVisible={isOptionsVisible}
           onVisibilityChange={setIsOptionsVisible}
          >
            <Button className={"--btn-hidden-comment"} onClick={handleToggleOptions}>
              Público
            </Button>
            <Button className={"--btn-report-comment"} onClick={handleToggleOptions}>
              Amigos
            </Button>
            <Button className={"--btn-report-comment"} onClick={handleToggleOptions}>
              Amigos excepto...
            </Button>
            <Button className={"--btn-report-comment"} onClick={handleToggleOptions}>
              Amigos concretos
            </Button>
            <Button className={"--btn-report-comment"} onClick={handleToggleOptions}>
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
