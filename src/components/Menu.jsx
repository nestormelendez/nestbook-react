import { API_URL } from "../constants";
import { useAuth } from "../Hooks/useAuth";
import { handleClick } from "../services/FuntionClick";
import { ContactChatUser, OptionsMenuHome } from "./Contact-chat-right";
import {
  SvgActivityAdvertising,
  SvgAdsManager,
  SvgArrowDown,
  SvgArrowUp,
  SvgBookMark,
  SvgCardCredit,
  SvgClimate,
  SvgCollections,
  SvgEmergency,
  SvgEvent,
  SvgFeeds,
  SvgFriends,
  SvgGroupMenu,
  SvgMarketPlace,
  SvgMessager,
  SvgMessagerKids,
  SvgMeta,
  SvgPage,
  SvgPlayGame,
  SvgPuzzle,
  SvgTime,
  SvgVideoMenu,
} from "./SvgHomeHeader";

export function Menu() {
  const { userData } = useAuth();
  console.log(userData);

  return (
    <main className="left">
      <section className="left-fixed">
        <aside className="container-menu">
          <header className="left-fixed-header">
            <ContactChatUser
              name={userData.name}
              urlImage={`${API_URL}/${userData.photo}`}
              onClick={handleClick}
            />
          </header>

          <OptionsMenuHome onClick={handleClick}>
            <SvgFriends
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgFriends>
            <span>Amigos</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgTime
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgTime>
            <span>Recuerdos</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgBookMark
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgBookMark>
            <span>Guardado</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgGroupMenu
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgGroupMenu>
            <span>Guardado</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgVideoMenu
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgVideoMenu>
            <span>Videos</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgActivityAdvertising
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgActivityAdvertising>
            <span>Actividad publicitaria reciente</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgAdsManager
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgAdsManager>
            <span>Administrador de anuncios</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgClimate
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgClimate>
            <span>Clima: Centro de informacion</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgEvent
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgEvent>
            <span>Eventos</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgFeeds
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgFeeds>
            <span>Feeds</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgPlayGame
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgPlayGame>
            <span>Jugar</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgMarketPlace
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgMarketPlace>
            <span>Marketplace</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgMessager
              width={"1em"}
              className={"menu-left-option"}
            ></SvgMessager>
            <span>Messenger</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgMessagerKids
              width={"1em"}
              className={"menu-left-option"}
            ></SvgMessagerKids>
            <span>Messenger Kids</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgMeta
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgMeta>
            <span>Meta Business Suite</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgPage
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgPage>
            <span>Paginas</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgCardCredit
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgCardCredit>
            <span>Pedidos y pagos</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgCollections
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgCollections>
            <span>Recaudaciones de fondos</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgEmergency
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgEmergency>
            <span>Respuesta ante emergencias</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgPuzzle
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgPuzzle>
            <span>Videos de juegos</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgArrowDown
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgArrowDown>
            <span>Ver menos</span>
          </OptionsMenuHome>

          <OptionsMenuHome onClick={handleClick}>
            <SvgArrowUp
              width={"1em"}
              fill={"#0866ff"}
              className={"menu-left-option"}
            ></SvgArrowUp>
            <span>Ver mas</span>
          </OptionsMenuHome>
        </aside>
      </section>
    </main>
  );
}
