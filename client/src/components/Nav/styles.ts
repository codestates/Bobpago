import styled from "styled-components";
import { ManageAccounts } from "@styled-icons/material-rounded/ManageAccounts";
import { PostAdd } from "@styled-icons/material/PostAdd";
import { main } from "theme";

interface NavProps {
  opac?: boolean;
}

export const NavContainer = styled.div<NavProps>`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  transition: 1s;
  background-color: ${({ opac }): any => {
    return opac ? "#ececec09" : "#ff975c";
  }};
  color: ${({ opac }): any => {
    return opac ? "black" : "#ffffff";
  }};
  align-items: center;
  z-index: 10;
  font-size: 18px;
  box-shadow: 0 0px 15px rgba(0, 0, 0, 0.2);
`;

export const NavLogoContainer = styled.div`
  padding: 1.2em;
  a {
    text-decoration: none;
  }
`;

export const NavLogo = styled.div<NavProps>`
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;
  color: ${({ opac }): any => {
    return opac ? "#ffffff" : "black";
  }};

  &:hover {
    color: red;
  }
`;

export const NavEtcContainer = styled.div``;

export const NavEtcUl = styled.ul`
  display: flex;
  list-style: none;
  margin-right: 2.5em;
  align-items: center;
`;

export const NavEtcList = styled.li`
  margin-left: 2em;
`;

export const HumanIcon = styled(ManageAccounts)<NavProps>`
  width: 1.5em;
  cursor: pointer;
  color: ${({ opac }): any => {
    return opac ? "#ffffff" : "black";
  }};
  transition: 0.2s;
  &:hover {
    color: red;
  }
`;

export const BoardIcon = styled(PostAdd)<NavProps>`
  width: 1.5em;
  cursor: pointer;
  transition: 0.2s;
  text-decoration: none;
  color: ${({ opac }): any => {
    return opac ? "#ffffff" : "black";
  }};
  &:hover {
    color: red;
  }
`;

export const LoginLogout = styled.div<NavProps>`
  cursor: pointer;
  transition: 0.2s;
  color: ${({ opac }): any => {
    return opac ? "#ffffff" : "black";
  }};
  &:hover {
    color: red;
  }
`;
