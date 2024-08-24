import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { handleClick } from "../services/FuntionClick";
import { BtnOptionsModal } from "./BtnOptionsModal";
import Button from "./Button";
import { ContactChatUser } from "./Contact-chat-right";
import { SvgSearch } from "./SvgHomeHeader";
import { useAuth } from "../Hooks/useAuth";

/* aqui debo implementear el custom hook para al montar este componente escuchar los cambios de los eventos mediante un useEfect
de esta forma podemos condicionar los cambios al recibir un mesaje  */

export function Chat() {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const { userData } = useAuth();

  const [data, setData] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/users`, {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        });
        if (!response.ok) {
          throw new Error(`Error al realizar la petición: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    return () => {};
  }, []);

  console.log(data);
  const handleToggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };
  return (
    <main className="right">
      <section className="right-fixed">
        <header className="right-fixed-header">
          <span>Contactos</span>
          <div className="flex">
            <Button onClick={handleClick}>
              <SvgSearch />
            </Button>
            <BtnOptionsModal
              isVisible={isOptionsVisible}
              onVisibilityChange={setIsOptionsVisible}
            >
              <Button
                className={"--btn-delete-comment"}
                onClick={handleToggleOptions}
              >
                Sonido del mensaje
              </Button>
              <Button
                className={"--btn-delete-comment"}
                onClick={handleToggleOptions}
              >
                Mostrar contactos
              </Button>
              <Button
                className={"--btn-delete-comment"}
                onClick={handleToggleOptions}
              >
                Privacidad y seguridad
              </Button>
            </BtnOptionsModal>
          </div>
        </header>
        <aside className="container-contact">
          {data ? (
            data.map((info) => {
              return info.id !== userData.id &&
                info.id !== 1 &&
                info.id !== 2 &&
                info.id !== 3 ? (
                <ContactChatUser
                  key={info.id}
                  id={info.id}
                  name={info.name}
                  urlImage={`${API_URL}/${info.photo}`}
                />
              ) : (
                ""
              );
            })
          ) : (
            <div>
              <span>no hay usuarios</span>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
