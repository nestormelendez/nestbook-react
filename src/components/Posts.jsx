import { useEffect } from "react";
import { API_URL } from "../constants";
import useFetchPosts from "../Hooks/useFetchPost";
import { handleClick } from "../services/FuntionClick";
import { CommentsOwn } from "./CommentsOwn";
import { CommentsOther } from "./CommentsOther";

import { CreateNewPost } from "./CreateNewPost";
import { useAuth } from "../Hooks/useAuth";
import { PostOwn } from "./PostsOwn";
import { PostOther } from "./PostOther";

export function Posts({ search }) {
  const { data, isLoading, error, fetchPosts } = useFetchPosts();
  const { userData } = useAuth();
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

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al obtener los Posts: {error.message}</div>;
  }
  console.log(data);

  // crear los post

  // tengo que hacer un fetch para traer la lista de usuarios con id

  // tengo que traer con fetch los comentarior y armarlos donde correspondan su postID,

  // tengo que traer con fetch los likes y armarlos donde correspondan sus postID
  // convertir las fechas de creacion de post y comment en hace tanto tiempo... (Moment)
  //funcion de sumar likes
  //funcion de submit comment
  // funcion de recargar la pagina al crear un post, likes y comment

  console.log(data);

  return (
    <main className="container-post-header">
      <CreateNewPost />

      {data ? (
        data
          .reverse()
          .filter((post) => {
            return post.content.toLowerCase().includes(search.toLowerCase());
          })
          .map((post) => {
            console.log(data);
            return post.userId === userData.id ? (
              <PostOwn
                key={post.id}
                publisherName={post.user.name}
                timeAgoPost={post.createdAt}
                urlImagePublisher={
                  post.image
                    ? `${API_URL}/${post.image}`
                    : "./src/assets/nestor.jpg"
                }
                postContent={post.content}
                postId={post.id}
              >
                {post.comments.reverse().map((comment) => {
                  console.log(data.comments);
                  return comment.userId === userData.id ? (
                    <CommentsOwn
                      key={comment.id}
                      comment={comment.text}
                      commentator={comment.user.name}
                      urlImage={comment.user.photo}
                      timeAgo={comment.createdAt}
                      handleClickLikes={handleClick}
                      handleClickComment={handleClick}
                      commentId={comment.id}
                    />
                  ) : (
                    <CommentsOther
                      key={comment.id}
                      comment={comment.text}
                      commentator={comment.user.name}
                      urlImage={comment.user.photo}
                      timeAgo={comment.createdAt}
                      handleClickLikes={handleClick}
                      handleClickComment={handleClick}
                      commentId={comment.id}
                    />
                  );
                })}
              </PostOwn>
            ) : (
              <PostOther
                key={post.id}
                publisherName={post.user.name}
                timeAgoPost={post.createdAt}
                urlImagePublisher={
                  post.image
                    ? `${API_URL}/${post.image}`
                    : "./src/assets/nestor.jpg"
                }
                postContent={post.content}
                postId={post.id}
              >
                {post.comments.reverse().map((comment) => {
                  return comment.userId === userData.id ? (
                    <CommentsOwn
                      key={comment.id}
                      comment={comment.text}
                      commentator={comment.user.name}
                      urlImage={comment.user.photo}
                      timeAgo={comment.createdAt}
                      handleClickLikes={handleClick}
                      handleClickComment={handleClick}
                      commentId={comment.id}
                    />
                  ) : (
                    <CommentsOther
                      key={comment.id}
                      comment={comment.text}
                      commentator={comment.user.name}
                      urlImage={comment.user.photo}
                      timeAgo={comment.createdAt}
                      handleClickLikes={handleClick}
                      handleClickComment={handleClick}
                      commentId={comment.id}
                    />
                  );
                })}
              </PostOther>
            );
          })
      ) : (
        <div>
          {" "}
          <span>No hay post en el backend</span>
        </div>
      )}
    </main>
  );
}
