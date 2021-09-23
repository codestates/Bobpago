import styled from "styled-components";

export const RightContent = styled.div`
  width: 45%;
  height: 70%;
  position: fixed;
  right: 2.4%;
  top: 12%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const RightContentBasic = styled.div`
  flex: 1;
  background-color: #ececec;
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
`;

export const RightContentWriter = styled.div``;

export const RightContentTitle = styled.div``;

export const RightContentTime = styled.div``;

export const RightContentDifficulty = styled.div``;

export const RightMainContent = styled.div`
  flex: 6;
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
  bottom: -6.5em;
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
