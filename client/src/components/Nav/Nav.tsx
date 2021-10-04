import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  NavContainer,
  NavLogoContainer,
  NavEtcContainer,
  NavEtcUl,
  NavEtcList,
  HumanIcon,
  BoardIcon,
  LoginLogout,
  NavLogo,
} from "./styles";
import { Link } from "react-router-dom";
import SignIn from "pages/SignUpAndSignIn/SignIn";
import SignUp from "pages/SignUpAndSignIn/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { showSignIn } from "actions/SignUpAndSignIn";
import { RootState } from "reducers";
import { removeAccessToken, reissueAccessToken } from "actions/Accesstoken";
import CheckExpired from "utils/CheckExpired";

const Nav = ({ opac }: { opac: boolean }) => {
  const [authorization, setAuthorization] = useState(false);
  const dispatch = useDispatch();
  const AccessState = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleLogout = async () => {
    try {
      if (AccessState.accessToken) {
        const newToken = await CheckExpired(
          AccessState.accessToken,
          AccessState.tokenType,
          AccessState.userId
        );
        if (newToken) {
          dispatch(reissueAccessToken(newToken));
        }
      }
      await axios.post(
        `${serverUrl}/auth/signout?tokenType=${AccessState.tokenType}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${AccessState.accessToken}`,
          },
        }
      );
      dispatch(removeAccessToken());
      setAuthorization(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (AccessState.accessToken !== "") {
      setAuthorization(true);
    }
  }, [AccessState]);
  return (
    <NavContainer opac={opac}>
      <SignIn />
      <SignUp />
      <NavLogoContainer>
        <Link to="/">
          <NavLogo>밥파고</NavLogo>
        </Link>
      </NavLogoContainer>
      <NavEtcContainer>
        {authorization ? (
          <NavEtcUl>
            <NavEtcList>
              <Link to="/mypage">
                <HumanIcon />
              </Link>
            </NavEtcList>
            <NavEtcList>
              <Link to="/writerecipe">
                <BoardIcon />
              </Link>
            </NavEtcList>
            <NavEtcList>
              <LoginLogout onClick={() => handleLogout()}>로그아웃</LoginLogout>
            </NavEtcList>
          </NavEtcUl>
        ) : (
          <NavEtcUl>
            <NavEtcList>
              <LoginLogout
                onClick={() => {
                  dispatch(showSignIn());
                  // if (!!AccessState.accessToken) {
                  //   setAuthorization(true);
                  // }
                }}
              >
                로그인
              </LoginLogout>
            </NavEtcList>
          </NavEtcUl>
        )}
      </NavEtcContainer>
    </NavContainer>
  );
};

export default Nav;
