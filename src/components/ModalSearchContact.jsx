import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { InputSearch } from "./Input";
import { useAuth } from "../Hooks/useAuth";
import { SvgXMark } from "./SvgHomeHeader";
import { API_URL } from "../constants";
import { SearchChatUser } from "./Contact-chat-right";

export function ModalSearchContact({ onModalClick }) {
  const [searchContact, setSearchContact] = useState("");
  const { userData } = useAuth();
  const chatContainerRef = useRef(null);
  const [users, setUsers] = useState([]);

  console.log(userData);

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
        setUsers(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    return () => {};
  }, []);

  const handleOut = () => {
    onModalClick();
  };

  return (
    <article className="search-new-chat ">
      <section className="search-new-chat-header">
        <div className="search-new-chat-header-input">
          <span className="search-new-chat-header-input-span">
            Nuevo mensaje:
          </span>
          <Button className={"btn delete-post"} onClick={handleOut}>
            <SvgXMark />
          </Button>
        </div>
        <div className="search-new-chat-header-input">
          <span className="search-new-chat-header-input-span">Para:</span>
          <InputSearch
            type={"text"}
            placeholder={``}
            value={searchContact}
            onChange={(e) => setSearchContact(e.target.value)}
            className={"--input-search-contact"}
          />
        </div>
      </section>
      <section className="container-chat-search" ref={chatContainerRef}>
        <aside className="container-contact-search">
          {users ? (
            [...users]
              .filter((user) => {
                return user.name
                  .toLowerCase()
                  .includes(searchContact.toLowerCase());
              })
              .map((user) => {
                return user.id !== userData.id &&
                  user.id !== 1 &&
                  user.id !== 2 &&
                  user.id !== 3 ? (
                  <SearchChatUser
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    urlImage={`${API_URL}/${user.photo}`}
                    onclose={onModalClick}
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
    </article>
  );
}
