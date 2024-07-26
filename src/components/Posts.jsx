import { API_URL } from "../constants";
import { handleClick } from "../services/FuntionClick";
import { CommentsOwn } from "./CommentsOwn";
import { CommentsOther } from "./CommentsOther";

import { CreateNewPost } from "./CreateNewPost";
import { useAuth } from "../Hooks/useAuth";
import { PostOwn } from "./PostsOwn";
import { PostOther } from "./PostOther";

export function Posts({ search }) {
  const { userData, postsData } = useAuth();

  // tengo que traer con fetch los likes y armarlos donde correspondan sus postID
  // convertir las fechas de creacion de post y comment en hace tanto tiempo... (Moment)
  //funcion de sumar likes
  //funcion de submit comment

  let posts = postsData;
  return (
    <main className="container-post-header">
      <CreateNewPost />
      {posts ? (
        posts
          .reverse()
          .filter((post) => {
            return post.content.toLowerCase().includes(search.toLowerCase());
          })
          .map((post) => {
            console.log(posts);
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
                  console.log(posts.comments);
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
