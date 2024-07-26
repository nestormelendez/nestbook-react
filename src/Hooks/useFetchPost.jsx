import { useEffect, useState } from "react";

const useFetchPosts = () => {
  const [dataPosts, setDataPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [errorPosts, setError] = useState(null);

  const fetchPosts = async (config) => {
    setIsLoadingPosts(true);
    setError(null);
    try {
      const response = await fetch(config.url, {
        method: config.method || "GET",
        headers: config.headers || { "Content-Type": "application/json" },
        body: config.body || null,
        redirect: "follow",
      });
      if (!response.ok) {
        throw new Error(`Error al realizar la petición: ${response.status}`);
      }
      const data = await response.json();
      setDataPosts(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoadingPosts(false);
    }
  };
  useEffect(() => {
    console.log(dataPosts);
  }, [dataPosts]);

  return { dataPosts, isLoadingPosts, errorPosts, fetchPosts };
};

export default useFetchPosts;
