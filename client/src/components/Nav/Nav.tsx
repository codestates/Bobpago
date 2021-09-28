import React from "react";
import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { showSignIn } from "actions/SignUpAndSignIn";

const Nav = ({ opac }: { opac: boolean }) => {
  const [authorization, setAuthorization] = useState(false);
  const dispatch = useDispatch();

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
              <LoginLogout>Logout</LoginLogout>
            </NavEtcList>
          </NavEtcUl>
        ) : (
          <NavEtcUl>
            <NavEtcList>
              <LoginLogout onClick={() => dispatch(showSignIn())}>
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
