import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Hamburger from "components/Hamburger/Hamburger";
import SideBar from "components/Sidebar/SideBar";
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
  ModalBackground,
  ModalContainer,
  ModalTitle,
  ModalBtn,
  ModalBtnNo,
  ResponsiveNavEtcList,
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
  const history = useHistory();
  const dispatch = useDispatch();
  const AccessState = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [sidebarOn, setSidebarOn] = useState<boolean>(false);

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
      history.push("/landing");
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
    <>
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
                <LoginLogout onClick={() => setLogoutModal(true)}>
                  로그아웃
                </LoginLogout>
              </NavEtcList>
              <ResponsiveNavEtcList>
                <Hamburger sidebarOn={sidebarOn} setSidebarOn={setSidebarOn} />
                <SideBar sidebarOn={sidebarOn} />
              </ResponsiveNavEtcList>
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
      {logoutModal && (
        <>
          <ModalBackground onClick={() => setLogoutModal(false)} />
          <ModalContainer>
            <ModalTitle>로그아웃 하시겠습니까?</ModalTitle>
            <ModalBtn onClick={() => handleLogout()}>네</ModalBtn>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <ModalBtnNo onClick={() => setLogoutModal(false)}>
              아니요
            </ModalBtnNo>
          </ModalContainer>
        </>
      )}
    </>
  );
};

export default Nav;
