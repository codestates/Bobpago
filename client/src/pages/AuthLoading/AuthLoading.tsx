import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { SET_ACCESSTOKEN } from "actions/Accesstoken";
import { showNothing } from "actions/SignUpAndSignIn";
import { LoadingContainer, LoadingImage } from "./styles";

const AuthLoading = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let kakao = new URL(window.location.href).searchParams.get("code");
  const handleKakao = async () => {
    const kakaoAuth = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/kakao?code=${kakao}`
    );
    console.log(kakaoAuth);

    dispatch({
      type: SET_ACCESSTOKEN,
      payload: {
        accessToken: kakaoAuth.data.data.accessToken,
        tokenType: kakaoAuth.data.data.tokenType,
        userId: kakaoAuth.data.data.id,
      },
    });
  };

  useEffect(() => {
    handleKakao();
    dispatch(showNothing());
    setTimeout(() => {
      // history.push({ pathname: "/" });
      history.goBack();
      history.goBack();
    }, 1000);
  }, []);
  return (
    <LoadingContainer>
      <LoadingImage src="/img/Bobpago.png" />
      {/* <LoadingContent>Loading</LoadingContent> */}
    </LoadingContainer>
  );
};

export default AuthLoading;
