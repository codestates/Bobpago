import axios from "axios";

async function CheckExpired(
  accessToken: string,
  tokenType: string,
  userId: number | null
) {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/me?tokenType=${tokenType}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return accessToken;
  } catch (err) {
    const result = await axios
      .get(`${serverUrl}/auth/tokenRequest?tokenType=${tokenType}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const newToken = response.data.data.accessToken;
        return newToken;
      })
      .catch((err) => {
        window.localStorage.clear();
        return null;
      });
    return result;
  }
}

export default CheckExpired;
