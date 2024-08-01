import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import useFetchCreateAccocunt from "./useAuthCreateAccount";
const AuthContext = createContext();

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export const AuthProvider = ({ children }) => {
  const { data, fetchData } = useFetchCreateAccocunt();
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
  // const newCommentFromContext = (postId, newComment) => {
  //   setPostsData((prevPosts) =>
  //     prevPosts.map((post) =>
  //       post.id === postId
  //         ? { ...post, comments: [...post.comments, newComment] }
  //         : post
  //     )
  //   );
  // };
  const CreateNewComment = async (postId, inputValue) => {
    let token = localStorage.getItem("token");
    const raw = JSON.stringify({
      text: inputValue,
      postId: postId,
    });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetchData({
      url: `${API_URL}/comments`,
      method: "POST",
      headers: myHeaders,
      body: raw,
    });

    // location.reload();
    setPostsData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, inputValue] }
          : post
      )
    );
  };
  const createNewLike = async (postId) => {
    let id = postId;
    let token = localStorage.getItem("token");
    const raw = JSON.stringify({
      postId: id,
    });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetchData({
      url: `${API_URL}/likes`,
      method: "POST",
      headers: myHeaders,
      body: raw,
    });

    // location.reload();
    setPostsData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: [...(post.likes || []), data] }
          : post
      )
    );
  };

  const deleteLikeAction = async (postId, likeId) => {
    console.log(postId);
    console.log(likeId);
    let token = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetchData({
      url: `${API_URL}/likes/${likeId}`,
      method: "DELETE",
      headers: myHeaders,
    });

    // location.reload();
    setPostsData((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          // Filtrar el comentario a eliminar
          return {
            ...post,
            likes: post.likes.filter((like) => like.id !== likeId),
          };
        } else {
          return post;
        }
      })
    );
  };
  const calcularTiempoTranscurrido = (fechaISO8601) => {
    const fechaPasada = new Date(fechaISO8601); // Convertir a objeto Date
    const ahora = new Date();
    const diferenciaEnMilisegundos = ahora - fechaPasada;
    console.log(fechaPasada);
    console.log(ahora);
    console.log(diferenciaEnMilisegundos);
    const segundos = Math.round(diferenciaEnMilisegundos / 1000);
    const minutos = Math.round(segundos / 60);
    const horas = Math.round(minutos / 60);
    const dias = Math.round(horas / 24);
    const anios = Math.round(dias / 365);

    if (anios > 0) {
      return `${anios} ${anios === 1 ? "año" : "años"}`;
    } else if (dias > 0) {
      return `${dias} ${dias === 1 ? "día" : "días"}`;
    } else if (horas > 0) {
      return `${horas} ${horas === 1 ? "hora" : "horas"}`;
    } else if (minutos > 0) {
      return `${minutos} ${minutos === 1 ? "minuto" : "minutos"}`;
    } else {
      return `${segundos} ${segundos === 1 ? "segundo" : "segundos"}`;
    }
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
        CreateNewComment,
        deleteCommentFromContext,
        calcularTiempoTranscurrido,
        createNewLike,
        deleteLikeAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
