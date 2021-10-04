import styled, { keyframes } from "styled-components";
import { LogOut } from "@styled-icons/boxicons-regular/LogOut/LogOut";

const elastic = keyframes`
  0% {
    border-radius: 30%;
  }
  45% {
    border-radius: 0;
  }
  65% {
    border-top-left-radius: 40px 50%;
    border-bottom-left-radius: 40px 50%;
  }
  80% {
    border-radius: 0;
  }
  90% {
    border-top-left-radius: 20px 50%;
    border-bottom-left-radius: 20px 50%;
  }
  100% {
    border-radius: 0%;
    box-shadow: 10px 10px 10px 10px grey; 
  }
`;

export const Navigation = styled.div`
  position: fixed;
  width: 300px;
  height: 100%;
  top: 0;
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 0;
  visibility: hidden;
  z-index: 99;
  transition-delay: 300ms;
  right: 0;
  &.active {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
    .navigation__inner {
      background-color: #fce9de;
      transform: translate(0, 0);
      transition: opacity 1s, transform 300ms linear,
        background-color 0s linear 599ms;
    }
    .navigation__inner::after {
      width: 300%;
      border-radius: 0%;
      animation: ${elastic} 150ms ease 0.3s both;
    }
  }
`;

export const NavigationInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 9;
  transform: translate(100%, 0);
  transition: opacity 1s, transform 0.3s linear, background-color 0s linear 0.3s;
  ::after {
    content: "";
    position: absolute;
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fce9de;
    border-radius: 30%;
    z-index: -1;
    transition: all 0.3s linear;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  margin-top: 6em;
`;

export const ListEl = styled.p`
  font-size: 45px;
  width: 100%;
  margin-top: 1em;

  &:hover {
    p {
      transform: scale(1.1);
    }
    svg {
      transform: scale(1.1);
    }
  }
`;

export const LogoutEl = styled.div`
  text-align: center;
  width: 100%;
  position: absolute;
  bottom: 3em;
  font-size: 45px;
  &:hover {
    p {
      transform: scale(1.1);
    }
    svg {
      transform: scale(1.1);
    }
  }
`;

export const LogoutIcon = styled(LogOut)`
  transition: all 0.2s ease-out;
  display: inline-block;
  width: 1.5em;
  height: 1.5em;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ListText = styled.p`
  display: inline-block;
  transition: all 0.2s ease-out;
  &:hover {
    transform: scale(1.1);
  }
`;
