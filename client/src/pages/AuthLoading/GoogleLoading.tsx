import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_ACCESSTOKEN } from "actions/Accesstoken";
import { useHistory } from "react-router";
import { showNothing } from "actions/SignUpAndSignIn";
import { LoadingContainer, LoadingContent, LoadingImage } from "./styles";

const GoogleLoading = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let googleCode = new URL(window.location.href).searchParams.get("code");
  let googleScope = new URL(window.location.href).searchParams.get("scope");

  const handleGoogle = async () => {
    const googleAuth = await axios.get(
      `http://localhost:3000/auth/google?code=${googleCode}&scope=${googleScope}`
    );

    dispatch({
      type: SET_ACCESSTOKEN,
      payload: {
        accessToken: googleAuth.data.data.accessToken,
        tokenType: googleAuth.data.data.tokenType,
      },
    });
  };

  useEffect(() => {
    handleGoogle();
    dispatch(showNothing());
    setTimeout(() => {
      history.push({ pathname: "/" });
    }, 1000);
  }, []);

  return (
    <LoadingContainer>
      <LoadingImage src="/img/Bobpago.png" />
      {/* <LoadingContent>Loading</LoadingContent> */}
    </LoadingContainer>
  );
};

export default GoogleLoading;
