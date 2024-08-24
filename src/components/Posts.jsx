import { API_URL } from "../constants";
import { handleClick } from "../services/FuntionClick";
import { CommentsOwn } from "./CommentsOwn";
import { CommentsOther } from "./CommentsOther";
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

  // if (isLoadingPosts) {
  //   return <div>Cargando...</div>;
  // }

  if (errorPosts) {
    return <div>Error al obtener los Posts: {errorPosts.message}</div>;
  }

  console.log({ dataPosts });

  return (
    <main className="container-post-header">
      <CreateNewPost />
      {dataPosts ? (
        [...dataPosts]
          .reverse()
          // .toReversed()
          .filter((post) => {
            return post.content.toLowerCase().includes(search.toLowerCase());
          })
          .map((post) => {
            let commentCount = post.comments.length;
            let postLikes = post.likes.length;
            let currentUserId = userData.id;
            let userLike = post.likes.find(
              (like) => like.userId === currentUserId
            );
            let likeId = userLike ? userLike.id : null;
            return post.userId === userData.id &&
              post.id !== 1 &&
              post.id !== 2 &&
              post.id !== 3 ? (
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
                commentCount={commentCount}
                postLikes={postLikes}
                likeId={likeId}
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
                publisherPhoto={post.user.photo}
                timeAgoPost={post.createdAt}
                urlImagePublisher={
                  post.image
                    ? `${API_URL}/${post.image}`
                    : "./src/assets/nestor.jpg"
                }
                postContent={post.content}
                postId={post.id}
                commentCount={commentCount}
                postLikes={postLikes}
                likeId={likeId}
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
