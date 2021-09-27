import React, { useState, useEffect } from "react";
import axios from "axios";

const usePost = (initUrl: string, data: any) => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    let ignore = false;
    const postData = async () => {
      try {
        const response = await axios.get(initUrl, data, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (!ignore) setResponse(response.data);
        setError({});
      } catch (err) {
        setError(err);
      }
    };
    postData();
    return () => {
      ignore = true;
    };
  }, [initUrl]);

  return { response, error };
};

export default usePost;
