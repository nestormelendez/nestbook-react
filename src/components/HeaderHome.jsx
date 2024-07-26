import { AvatarProfileLogout } from "./AvatarProfile";
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
        <AvatarProfileLogout />
      </article>
    </header>
  );
}
