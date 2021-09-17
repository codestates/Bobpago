import styled from "styled-components";
import { ManageAccounts } from "@styled-icons/material-rounded/ManageAccounts";
import { PostAdd } from "@styled-icons/material/PostAdd";
import { main } from "theme";

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  background-color: #ececec;
  color: black;
  align-items: center;
  z-index: 10;
  font-size: 18px;
  box-shadow: 0 0px 15px rgba(0, 0, 0, 0.1);
`;

export const NavLogoContainer = styled.div`
  padding: 1.2em;
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

export const HumanIcon = styled(ManageAccounts)`
  width: 1.5em;
`;

export const BoardIcon = styled(PostAdd)`
  width: 1.5em;
`;
