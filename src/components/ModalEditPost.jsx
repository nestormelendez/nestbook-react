import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useAuth } from "../Hooks/useAuth";
import useFetchCreateAccocunt from "../Hooks/useAuthCreateAccount";
import { API_URL } from "../constants";
import { AvatarProfile } from "./AvatarProfile";

export function ModalEditPost({ postId, content }) {
  console.log(postId);
  console.log(content);
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const { userData, editPostFromContext } = useAuth();
  const { isLoading, error, data, fetchData } = useFetchCreateAccocunt();

  const EditPost = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");

    const raw = JSON.stringify({
      content: newContent,
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    await fetchData({
      url: `${API_URL}/posts/${postId}`,
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });
    closeModal()
  };

  useEffect(() => {
    if (data) {
      console.log("hola");
      // location.reload();
      editPostFromContext(postId, newContent);
    }
  }, [data])
  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewContent(content);
  };
  const handleChangeContent = (e) => {
    setNewContent(e.target.value);
  };

  return (
    <div className="new-post-header-user">
      <Button className={"--btn-edit-comment"} onClick={openModal}>
        Editar
      </Button>

      {showModal ? (
        <article className="post-modal">
          <article className="post-create-header">
            <form
              className="input-new-post"
              encType="multipart/form-data"
              onSubmit={EditPost}
            >
              <section className="post-create-header-user">
                <AvatarProfile />
                <h2 className="post-create-header-name">{userData.name}</h2>

                {isLoading ? (
                  <p className="cargando">¡Cargando.....!</p> // Si isLoggedIn es true
                ) : (
                  <p></p> // Si isLoggedIn es false
                )}
                {error ? (
                  <p className="error-text">dio error...</p>
                ) : (
                  <p></p> // Si isLoggedIn es false
                )}
              </section>

              <div className="input-post-content">
                <div className="btn-input-new-post">
                  <Input
                    type={"text"}
                    name="content"
                    value={newContent}
                    required
                    placeholder={newContent}
                    onChange={handleChangeContent}
                  ></Input>
                </div>
              </div>
              <div className="btns-post-options">
                <Button type={"submit"} className={"--create-posts"}>
                  Publicar
                </Button>
                <Button className={"--create-cancel"} onClick={closeModal}>
                  cancelar
                </Button>
              </div>
            </form>
          </article>
        </article>
      ) : (
        ""
      )}
    </div>
  );
}
