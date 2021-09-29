import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "reducers";
import { SET_ACCESSTOKEN } from "actions/Accesstoken";
import { showNothing } from "actions/SignUpAndSignIn";
import { LoadingContainer, LoadingContent, LoadingImage } from "./styles";

const AuthLoading = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let kakao = new URL(window.location.href).searchParams.get("code");
  const handleKakao = async () => {
    const kakaoAuth = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/kakao?code=${kakao}`
    );

    dispatch({
      type: SET_ACCESSTOKEN,
      payload: {
        accessToken: kakaoAuth.data.data.accessToken,
        tokenType: kakaoAuth.data.data.tokenType,
      },
    });
  };

  useEffect(() => {
    handleKakao();
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

export default AuthLoading;
