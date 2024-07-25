import { useState } from 'react';

const useFetchPosts = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async (config) => {
    setIsLoading(true);
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
      console.log(data)
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { data, isLoading, error, fetchPosts };
};

export default useFetchPosts;