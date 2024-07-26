import { useEffect, useState } from "react";
import { handleClick } from "../services/FuntionClick";
import Button from "./Button";
import { Chat } from "./Chat";
import { HeaderHome } from "./HeaderHome";
import { Menu } from "./Menu";
import { Posts } from "./Posts";
import { SvgChat } from "./SvgHomeHeader";
import useFetchPosts from "../Hooks/useFetchPost";
import { API_URL } from "../constants";
import { useAuth } from "../Hooks/useAuth";

function Home() {
  const { dataPosts, isLoadingPosts, errorPosts, fetchPosts } = useFetchPosts();
  const [search, setSearch] = useState("");
  const { setPostsData } = useAuth();
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  useEffect(() => {
    fetchPosts({
      url: `${API_URL}/posts`,
      method: "GET",
      headers: myHeaders,
    });
  }, []);

  if (isLoadingPosts) {
    return <div>Cargando...</div>;
  }

  if (errorPosts) {
    return <div>Error al obtener los Posts: {errorPosts.message}</div>;
  }
  let ddd = dataPosts.reverse();
  console.log(dataPosts);
  setPostsData(ddd);
  console.log(dataPosts);

  const updatePostsWithNewComment = (newCommentData) => {
    setPostsData((prevPosts) => {
      // Encuentra el post donde se agregó el comentario
      const updatedPosts = prevPosts.map((post) => {
        if (post.id === newCommentData.postId) {
          // Agrega el nuevo comentario a la lista de comentarios del post
          return {
            ...post,
            comments: [...post.comments, newCommentData],
          };
        }
        return post;
      });
      setPostsData(updatedPosts);
      return updatedPosts;
    });
  };

  return (
    <main className="home">
      <section className="container-home">
        <HeaderHome setSearch={setSearch} />
        <section className="container-home-posts">
          <Menu></Menu>
          <article className="center">
            <Posts
              search={search}
              updatedPosts={updatePostsWithNewComment}
              setPostsData={setPostsData}
            />
          </article>
          <Chat></Chat>
          <Button className={"btn-chat"} onClick={handleClick}>
            <SvgChat />
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Home;
