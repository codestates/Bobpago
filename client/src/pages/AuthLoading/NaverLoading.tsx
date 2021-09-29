import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { SET_ACCESSTOKEN } from "actions/Accesstoken";
import { showNothing } from "actions/SignUpAndSignIn";
import { LoadingContainer, LoadingContent, LoadingImage } from "./styles";

const NaverLoading = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let naverCode = new URL(window.location.href).searchParams.get("code");
  let naverState = new URL(window.location.href).searchParams.get("state");
  const handleNaver = async () => {
    const naverAuth = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/naver?code=${naverCode}&state=${naverState}`
    );
    dispatch({
      type: SET_ACCESSTOKEN,
      payload: {
        accessToken: naverAuth.data.data.accessToken,
        tokenType: naverAuth.data.data.tokenType,
      },
    });
  };

  useEffect(() => {
    handleNaver();
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

export default NaverLoading;
