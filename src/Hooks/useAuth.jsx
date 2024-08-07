import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, WEBSOCKET_URL } from "../constants";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState("hola");
  const [postsData, setPostsData] = useState([]);
  const [arrayChatActives, setArrayChatActives] = useState([]);
  const [webSocket, setWebSocket] = useState(null);

  const [messages, setMessages] = useState({});
  const [connecteUsers, setConnecteUsers] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      initWebSocket(token);
    }
  }, [isAuthenticated]);

  const fetchChatMessages = async (chatId) => {
    try {
      const token = localStorage.getItem("token");
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`${API_URL}/chats/${chatId}`, {
        headers: myHeaders,
      });

      if (!response.ok) {
        throw new Error(`Error al obtener los mensajes: ${response.status}`);
      }

      const data = await response.json();
      updateChatMessages(userData.id, chatId, data);
    } catch (error) {
      console.error("Error al cargar los mensajes:", error);
    }
  };

  useEffect(() => {
    if (webSocket) {
      console.log("WebSocket actualizado:", webSocket);
      console.log(arrayChatActives);

      webSocket.onopen = () => {
        console.log(webSocket);
        arrayChatActives.forEach((chat) => {
          fetchChatMessages(chat.id);
        });
        const objToSend = {
          type: "connected-users",
          token: localStorage.getItem("token"), // Asegúrate de tener el token aquí
        };
        webSocket.send(JSON.stringify(objToSend));
      };

      webSocket.onmessage = (event) => {
        handleWebSocketMessage(event);
      };

      webSocket.onclose = () => {
        setWebSocket(null);
        console.log(webSocket);
      };

      // Limpieza del WebSocket al desmontar el componente
      return () => {
        if (webSocket) {
          webSocket.close();
        }
      };
    }
  }, [webSocket]); // Ejecuta cuando webSocket cambie

  const updateChatMessages = (userId, toUserId, newMessage) => {
    const chatKey = [userId, toUserId].sort().join("-");

    setMessages((prevMessages) => ({
      ...prevMessages,
      [chatKey]: [...(prevMessages[chatKey] || []), newMessage],
    }));
    console.log(messages);
  };

  function initWebSocket(token) {
    console.log(token);
    const ws = new WebSocket(WEBSOCKET_URL);
    setWebSocket(ws);
  }

  function handleWebSocketMessage(event) {
    let data = JSON.parse(event.data);
    console.log(data);
    if (data.type === `connected-users`) {
      console.log(data);
      setConnecteUsers(data.users);
    }
    if (data.type === `message`) {
      console.log(data.message);
      updateChatMessages(
        data.message.userId,
        data.message.toUserId,
        data.message
      );
    }
  }

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
      token = data.token;
      if (token) {
        setIsAuthenticated(true);
        setUserData(data.user);
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        navigate("/oops");
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const reload = async () => {
    // hacer que cuando se haga reload cargen los mensajes  chat a tavez del fetch
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
        setIsAuthenticated(true);
        const userActive = data.user;
        setUserData(userActive);
        console.log(webSocket);
        arrayChatActives.forEach((chat) => {
          fetchChatMessages(chat.id);
        });
        console.log(arrayChatActives);
        navigate("/home");
      } else {
        navigate("/oops");
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const tokenLocalStorage = () => {
    setIsAuthenticated(true);
    navigate("/home");
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserData(null);
    webSocket.onclose();
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

  const newChatActiveContext = (newChatActive) => {
    setArrayChatActives((prevChats) => {
      const alreadyExists = prevChats.some(
        (chat) => chat.id === newChatActive.id
      );
      if (!alreadyExists) {
        return [newChatActive, ...prevChats];
      } else {
        return prevChats;
      }
    });
  };


  const deleteChatActiveContext = (chatId) => {
    setArrayChatActives((prevChats) =>
      prevChats.filter((chat) => chat.id !== chatId)
    );
  };

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

    setPostsData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: [...(post.likes || []), data] }
          : post
      )
    );
  };

  const deleteLikeAction = async (postId, likeId) => {
    let token = localStorage.getItem("token");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetchData({
      url: `${API_URL}/likes/${likeId}`,
      method: "DELETE",
      headers: myHeaders,
    });

    setPostsData((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
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
        arrayChatActives,
        newChatActiveContext,
        deleteChatActiveContext,
        webSocket,
        messages,
        setMessages,
        connecteUsers,
        initWebSocket,
        updateChatMessages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
