import { useEffect, useState } from "react";
import Button from "./Button";
import Input, { InputSearch } from "./Input";
import { useAuth } from "../Hooks/useAuth";
import useFetchCreateAccocunt from "../Hooks/useAuthCreateAccount";
import { API_URL } from "../constants";
import { AvatarProfile } from "./AvatarProfile";

export function ModalNewPost() {
  const [showModal, setShowModal] = useState(false);
  const { userData, newPostFromContext } = useAuth();
  const { isLoading, error, data, fetchData } = useFetchCreateAccocunt();

  const [selectedImage, setSelectedImage] = useState(null);

  // Manejador de eventos para el cambio de la imagen
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage(reader.result); // Guarda la URL de la imagen en el estado
        console.log(selectedImage);
      };

      reader.readAsDataURL(event.target.files[0]); // Lee el archivo como una URL de datos
    }
  };

  const CreateNewPost = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");

    const loginData = new FormData(e.target);
    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${token}`);

    await fetchData({
      url: `${API_URL}/posts`,
      method: "POST",
      headers: myHeaders,
      body: loginData,
    });
    closeModal();
  };
  useEffect(() => {
    console.log(data);
    if (data) {
      console.log(data);
      // location.reload();
      newPostFromContext(data);
    }
  }, [data]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="new-post-header-user">
      <Button className={"input-new-post"} onClick={openModal}>
        <InputSearch placeholder={`¿Que estas pensando, ${userData.name} ?`} />
      </Button>

      {showModal ? (
        <article className="post-modal">
          <article className="post-create-header">
            <form
              className="input-new-post"
              encType="multipart/form-data"
              onSubmit={CreateNewPost}
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
                    required
                    placeholder={`¿Qué estás pensando?, ${userData.name}`}
                  ></Input>
                  <Input
                    type={"file"}
                    name="image"
                    onChange={handleImageChange}
                    required
                  ></Input>
                </div>
                <div className="content-img-post-preview">
                  <img
                    className="img-post-preview"
                    src={selectedImage}
                    alt={selectedImage}
                  />
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
        <p></p>
      )}
    </div>
  );
}
