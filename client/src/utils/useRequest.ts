import React, { useState, useEffect } from "react";
import axios from "axios";

const useRequest = (initUrl: string) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    let ignore = false;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        setError({});
        const response = await axios.get(initUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (!ignore) setData(response.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchProduct();
    return () => {
      ignore = true;
    };
  }, [initUrl]);

  return { data, loading, error };
};

export default useRequest;
