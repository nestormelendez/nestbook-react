import { useState } from "react";

const useFetchCreateAccocunt = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (config) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(config.url, {
        method: config.method || "GET",
        headers: config.headers || { "Content-Type": "application/json" },
        body: config.body,
        redirect: "follow",
      });
      if (!response.ok) {
        throw new Error(`Error al realizar la petición: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
};

export default useFetchCreateAccocunt;