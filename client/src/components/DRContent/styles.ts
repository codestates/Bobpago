import styled from "styled-components";
import { Time } from "@styled-icons/boxicons-regular/Time";
import { main } from "theme";
import { UserCircle } from "@styled-icons/boxicons-regular/UserCircle";

export const RightContent = styled.div`
  width: 45%;
  height: 70%;
  position: fixed;
  right: -1%;
  top: 15%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  z-index: 2;
  /* z-index: 1000; */
  @media screen and (max-width: 768px) {
    width: 102%;
    left: 5.7%;
    z-index: 10;
  }
`;

export const RightContentBasic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 33.2%;
  height: 20%;
  background-color: #ececec;
  justify-content: space-around;
  position: relative;
  transform: translateX(100.1%);
  z-index: 10;
  left: 21.78%;
  @media screen and (max-width: 768px) {
    flex-direction: row;
    width: 88.28%;
    left: -88.5%;
    height: 5%;
    top: 28%;
  }
`;

export const RightContentWriter = styled.div`
  width: 30%;
  height: 10%;
  padding: 1em;
  display: flex;
  font-size: 1.5em;
  justify-content: center;
  align-items: center;
  transform: translate(20%, 5%);
  background-color: #ececec;
  z-index: 10;
  border: 3px solid #2d325b;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    transform: translateY(706%);
    border-radius: 0px;
    height: 14.15%;
    border-bottom-left-radius: 15px;
    border: 3px solid #2d325b;
    border-right: 4px solid #2d325b;
  }
`;

export const RightContentTitle = styled.div`
  width: 88.2%;
  height: 20%;
  padding: 1em;
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
  background-color: #faff61;
  border: 3px solid #2d325b;
  font-size: 48px;
  font-weight: 500;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  @media screen and (max-width: 768px) {
    transform: translateY(280%);
    width: 88.2%;
    height: 10%;
    padding-bottom: 0;
    padding-top: 0;
    border-radius: 0;
    font-size: 32px;
  }
`;

export const RightContentTime = styled.div`
  border: 3px solid #2d325b;
  border-top: none;
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: ${main.smallestFont};
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 18px;
    border-left: 4px solid #2d325b;
  }
`;

export const RightContentDifficulty = styled.div`
  border: 3px solid #2d325b;
  border-top: none;
  border-bottom: none;
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${main.smallestFont};
  @media screen and (max-width: 768px) {
    border-bottom: 3px solid #2d325b;

    font-size: 18px;
    div {
      font-size: 12px;
    }
  }
`;

export const RightMainContent = styled.div`
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 5px;
  margin-top: 1em;
`;

export const RightMainFooter = styled.footer`
  position: absolute;
  width: 100%;
  height: 20%;
  background-color: #ececec;
  bottom: -15.5em;
  right: 2em;
  border-radius: 10px;
`;

export const TimeIcon = styled(Time)`
  width: 20px;
  @media screen and (max-width: 768px) {
    width: 15px;
  }
`;

export const UserIcon = styled(UserCircle)`
  width: 25px;
  margin-right: 0.2em;
`;
