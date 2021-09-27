import styled from "styled-components";

export const RightContent = styled.div`
  width: 45%;
  height: 70%;
  position: fixed;
  right: -1%;
  top: 15%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const RightContentBasic = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 20%;
  background-color: #ececec;
  justify-content: space-around;
  position: relative;
  transform: translateX(220.2%);
`;

export const RightContentWriter = styled.div`
  width: 30%;
  height: 10%;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(20%, 5%);
  background-color: #ececec;
  border: 1px solid #2d325b;
`;

export const RightContentTitle = styled.div`
  width: 80%;
  height: 20%;
  padding: 1em;
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
  background-color: #ececec;
  border: 1px solid #2d325b;
  border-bottom: none;
  font-size: 32px;
  font-weight: 900;
`;

export const RightContentTime = styled.div`
  border: 1px solid #2d325b;
  border-left: none;
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightContentDifficulty = styled.div`
  border: 1px solid black;
  border-left: none;
  border-top: none;
  border-bottom: none;
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightMainContent = styled.div`
  background-color: #ececec;
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.5);
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
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.5);
  bottom: -15.5em;
  right: 2em;
  border-radius: 10px;
`;

export const CommentButton = styled.button`
  position: absolute;
  right: 5%;
  top: 30%;
  width: 5em;
  height: 2.5em;
  background-color: #d43838;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: red;
    transform: scale(1.1);
  }
`;
