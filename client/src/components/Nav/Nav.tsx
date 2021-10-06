import React, { useEffect } from "react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
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
  ModalBackground,
  ModalContainer,
  ModalTitle,
  ModalBtn,
  ModalBtnNo,
  ResponsiveNavEtcList,
  BobPagoIcon,
  NavEtcListNotLogin,
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
    let newToken = null;
    if (AccessState.accessToken) {
      newToken = await CheckExpired(
        AccessState.accessToken,
        AccessState.tokenType,
        AccessState.userId
      );
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      await axios.post(
        `${serverUrl}/auth/signout?tokenType=${AccessState.tokenType}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${
              newToken ? newToken : AccessState.accessToken
            }`,
          },
        }
      );
      dispatch(removeAccessToken());
      setAuthorization(false);
      setSidebarOn(false);
      history.push("/");
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          setAuthorization(false);
          history.push("/");
        }
      }
    }
  };

  useEffect(() => {
    if (AccessState.accessToken) {
      setAuthorization(true);
    } else {
      setAuthorization(false);
    }
  }, [AccessState]);
  return (
    <>
      <NavContainer opac={opac}>
        <SignIn />
        <SignUp />
        <NavLogoContainer>
          <Link to="/survey">
            <BobPagoIcon src="/img/Bobpago2.png" />
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
                <SideBar
                  setLogoutModal={setLogoutModal}
                  sidebarOn={sidebarOn}
                  setSidebarOn={setSidebarOn}
                />
              </ResponsiveNavEtcList>
            </NavEtcUl>
          ) : (
            <NavEtcUl>
              <NavEtcListNotLogin>
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
              </NavEtcListNotLogin>
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
