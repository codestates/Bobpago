import axios from "axios";

async function CheckExpired(
  accessToken: string,
  tokenType: string,
  userId: number | null
) {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  //'{"email":"aaa@aa.aa","iat":1633259477,"exp":1633277477}'
  const decodedJWT = window.atob(accessToken.split(".")[1]);
  const parsedJWT = JSON.parse(decodedJWT);
  const now = new Date();
  const fiveMinutes = 1000 * 60 * 5;

  if (parsedJWT.exp * 1000 - now.getTime() <= fiveMinutes) {
    const response = await axios.get(
      `${serverUrl}/auth/${userId}/tokenRequest?tokenType=${tokenType}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const newToken = response.data.data.accessToken;
    return newToken;
  } else {
    return null;
  }
}

export default CheckExpired;
