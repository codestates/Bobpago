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
import { REMOVE_ACCESSTOKEN } from "actions/Accesstoken";
import { CLEAR_CLICK_DATA } from "actions/IngredientAction";

const Nav = ({ opac }: { opac: boolean }) => {
  const [authorization, setAuthorization] = useState(false);
  const dispatch = useDispatch();
  const AccessState = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/auth/signout?tokenType=jwt`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${AccessState.accessToken}`,
          },
        }
      );
      dispatch({
        type: REMOVE_ACCESSTOKEN,
      });
      setAuthorization(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (AccessState.accessToken !== "") {
      setAuthorization(true);
    }
  }, []);
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
              <LoginLogout onClick={() => handleLogout()}>Logout</LoginLogout>
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
                Login
              </LoginLogout>
            </NavEtcList>
          </NavEtcUl>
        )}
      </NavEtcContainer>
    </NavContainer>
  );
};

export default Nav;
