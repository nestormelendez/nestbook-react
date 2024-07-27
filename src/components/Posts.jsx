import { API_URL } from "../constants";
import { handleClick } from "../services/FuntionClick";
import { CommentsOwn } from "./CommentsOwn";
import { CommentsOther } from "./CommentsOther";
import moment from "moment";
import { CreateNewPost } from "./CreateNewPost";
import { useAuth } from "../Hooks/useAuth";
import { PostOwn } from "./PostsOwn";
import { PostOther } from "./PostOther";
import { useEffect } from "react";
import useFetchPosts from "../Hooks/useFetchPost";

export function Posts({ search }) {
  const { userData, postsData } = useAuth();
  console.log(userData);
  console.log(postsData);
  const { dataPosts, isLoadingPosts, errorPosts, fetchPosts } = useFetchPosts();
  const token = localStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  useEffect(() => {
    fetchPosts({
      url: `${API_URL}/posts`,
      method: "GET",
      headers: myHeaders,
    });
  }, [postsData]);

  if (isLoadingPosts) {
    return <div>Cargando...</div>;
  }

  if (errorPosts) {
    return <div>Error al obtener los Posts: {errorPosts.message}</div>;
  }

  console.log(dataPosts);

  console.log(dataPosts);
  // tengo que traer con fetch los likes y armarlos donde correspondan sus postID
  //funcion de sumar likes
  //funcion de submit comment

  return (
    <main className="container-post-header">
      <CreateNewPost />
      {dataPosts ? (
        dataPosts
          .reverse()
          .filter((post) => {
            return post.content.toLowerCase().includes(search.toLowerCase());
          })
          .map((post) => {
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
                      postId={comment.postId}
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
                      postId={comment.postId}
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
                      postId={comment.postId}
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
                      postId={comment.postId}
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
