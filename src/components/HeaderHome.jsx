import { useState } from "react";
import { AvatarProfileLogout } from "./AvatarProfile";
import { BtnOptionsModalOut } from "./BtnOptionsModal";
import Button from "./Button";
import { InputSearch } from "./Input";
import {
  SvgFaceBook,
  SvgGame,
  SvgGroup,
  SvgHome,
  SvgMarket,
  SvgVideo,
} from "./SvgHomeHeader";
export function HeaderHome({ setSearch }) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const handleToggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };
  return (
    <header className="container-home-header">
      <article className="content-search">
        <Button>
          <SvgFaceBook />
        </Button>

        <InputSearch
          type={"search"}
          placeholder={"Busqueda en Facebook"}
          name={"inputsearch"}
          onChange={(e) => setSearch(e.target.value)}
        />
      </article>

      <article className="content-options">
        <Button>
          <SvgHome />
        </Button>

        <Button>
          <SvgVideo />
        </Button>

        <Button>
          <SvgMarket />
        </Button>

        <Button>
          <SvgGroup />
        </Button>
        <Button>
          <SvgGame />
        </Button>
      </article>

      <article className="content-menu">
        <BtnOptionsModalOut
          isVisible={isOptionsVisible}
          onVisibilityChange={setIsOptionsVisible}
        >
          <AvatarProfileLogout onModalClick={handleToggleOptions} />
        </BtnOptionsModalOut>
      </article>
    </header>
  );
}
