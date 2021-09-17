import React from "react";
import {
  NavContainer,
  NavLogoContainer,
  NavEtcContainer,
  NavEtcUl,
  NavEtcList,
  HumanIcon,
  BoardIcon,
} from "./styles";

const Nav = () => {
  return (
    <NavContainer>
      <NavLogoContainer>Logo</NavLogoContainer>
      <NavEtcContainer>
        <NavEtcUl>
          <NavEtcList>
            <HumanIcon />
          </NavEtcList>
          <NavEtcList>
            <BoardIcon />
          </NavEtcList>
          <NavEtcList>Logout</NavEtcList>
        </NavEtcUl>
      </NavEtcContainer>
    </NavContainer>
  );
};

export default Nav;
