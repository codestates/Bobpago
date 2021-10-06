import styled, { keyframes } from "styled-components";
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
  font-size: 18px;
  box-shadow: 0 0px 15px rgba(0, 0, 0, 0.2);
  z-index: 96;
`;

export const NavLogoContainer = styled.div`
  padding: 1.2em;
  margin-left: 5em;
  z-index: 10;
  a {
    display: flex;
    text-decoration: none;
    align-items: center;
  }
  @media screen and (max-width: 768px) {
    margin-left: 3em;
  }
  @media screen and (max-width: 768px) {
    margin-left: 2em;
  }
`;

export const NavEtcContainer = styled.div`
  margin-right: 4em;
  @media screen and (max-width: 768px) {
    margin-right: 3em;
  }
  @media screen and (max-width: 768px) {
    margin-right: 1.5em;
  }
`;

export const NavEtcUl = styled.ul`
  display: flex;
  list-style: none;
  margin-right: 1.2em;
  align-items: center;
  font-size: 1.7em;
`;

export const NavEtcList = styled.li`
  margin-left: 1.5em;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavEtcListNotLogin = styled(NavEtcList)`
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const ResponsiveNavEtcList = styled(NavEtcList)`
  display: none;
  z-index: 100;
  position: relative;
  @media screen and (max-width: 768px) {
    display: block;
  }
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

export const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: grey;
  opacity: 0.5;
  z-index: 9999;
`;

export const ModalTitle = styled.p`
  font-size: 22px;
  margin: 3em auto;
  margin-bottom: 2em;
`;

export const ModalBtn = styled.button`
  outline: none;
  border-radius: 10px;
  border: none;
  height: 1.5em;
  font-size: 18px;
  min-width: 3em;
  background: #42a5c9;
  color: #fff;
  cursor: pointer;
`;

export const ModalBtnNo = styled(ModalBtn)`
  background: #42a5c9;
`;

const showModal = keyframes`
  from {
    top: -10%;
    right: -70%;
    transform: scale(0) ;
  }
  to {
    top: 35%
    transform: scale(1);
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 35%;
  margin: 0 auto;
  left: 0;
  right: 0;
  float: center;
  width: 25em;
  height: 13em;
  animation: ${showModal} 0.5s;
  z-index: 10000;
  background: #f5f5f5;
  border-radius: 15px;
  text-align: center;
`;

export const BobPagoIcon = styled.img`
  width: 12em;
  height: 3.5em;
  object-fit: contain;
  @media screen and (max-width: 768px) {
    width: 10em;
    height: 3em;
  }
  @media screen and (max-width: 480px) {
    width: 8em;
    height: 2.5em;
  }
`;
