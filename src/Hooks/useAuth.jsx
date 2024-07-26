import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
const AuthContext = createContext();

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState("hola");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postsData, setPostsData] = useState([]);

  const login = async (e) => {
    e.preventDefault();
    const loginData = new FormData(e.target);
    const userEmail = loginData.get("userEmail");
    const userPassword = loginData.get("userPassword");
    let token = "";
    const myHeaderLogin = new Headers();
    myHeaderLogin.append("Content-type", "application/json");
    const raw = JSON.stringify({ email: userEmail, password: userPassword });
    const requestOptions = {
      method: "POST",
      headers: myHeaderLogin,
      body: raw,
      redirect: "follow",
    };
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, requestOptions);
      if (!response.ok) {
        throw new Error(`Error al realizar la petición: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      token = data.token;
      console.log(token);
      if (token) {
        console.log(data);
        setIsAuthenticated(true);
        setUserData(data.user);
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        navigate("/oops");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const reload = async () => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/me`, requestOptions);
      if (!response.ok) {
        throw new Error(`Error al realizar la petición: ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        console.log(data);
        setIsAuthenticated(true);
        const userActive = data.user;
        setUserData(userActive);
        navigate("/home");
      } else {
        navigate("/oops");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const tokenLocalStorage = () => {
    setIsAuthenticated(true);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserData(null);
    navigate("/");
  };
  const deletePostFromContext = (postId) => {
    setPostsData((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };
  const deleteCommentFromContext = (postId, commentId) => {
    setPostsData((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          // Filtrar el comentario a eliminar
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== commentId
            ),
          };
        } else {
          return post;
        }
      })
    );
  };
  const editCommentFromContext = (postId, commentId, newText) => {
    setPostsData((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) =>
              comment.id === commentId ? { ...comment, text: newText } : comment
            ),
          };
        } else {
          return post;
        }
      })
    );
  };
  const editPostFromContext = (postId, newContent) => {
    setPostsData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, content: newContent } : post
      )
    );
  };
  const newPostFromContext = (newPost) => {
    setPostsData((prevPosts) => [newPost, ...prevPosts]);
  };
  const newCommentFromContext = (postId, newComment) => {
    setPostsData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };
  console.log(isAuthenticated);
  console.log(isLoading);
  console.log(error);
  console.log(userData);
  console.log(postsData);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        tokenLocalStorage,
        login,
        logout,
        isLoading,
        error,
        userData,
        reload,
        postsData,
        setPostsData,
        deletePostFromContext,
        newPostFromContext,
        editPostFromContext,
        editCommentFromContext,
        newCommentFromContext,
        deleteCommentFromContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
