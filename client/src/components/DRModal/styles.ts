import styled from "styled-components";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Camera } from "@styled-icons/bootstrap/Camera";

interface ButtonColor {
  color?: string;
}

export const CommentModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 50;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CommentContainer = styled.div`
  position: absolute;
  width: 80%;
  height: 90%;
  left: 10%;
  top: 5%;
  background-color: rgba(230, 230, 230, 1);
  z-index: 100;
  padding: 2em;
  padding-top: 3em;
  padding-right: 3em;
  border-radius: 15px;
`;

export const SudoContainer = styled.div`
  background-color: #ffffff;
  height: 90%;
  overflow: scroll;
  overflow-x: hidden;
  padding: 2em;
  border-radius: 10px;
`;

export const PostCommentContainer = styled.div`
  position: absolute;
  bottom: 3em;
  width: 93%;
  height: 5%;
  z-index: 100;
`;

export const PostCommentInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid gray;
  background-color: transparent;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: -2.5em;
  right: 0;
`;

export const CommentPostButton = styled.button<ButtonColor>`
  margin-left: 1em;
  padding: 0.5em 2em;
  outline: none;
  border: none;
  background-color: ${({ color }) => {
    return color;
  }};
  color: black;
  border-radius: 5px;
  transition: 0.5s;
  /* opacity: 0; */
  cursor: pointer;
`;

export const CloseIcon = styled(CloseOutline)`
  width: 30px;
  position: absolute;
  top: 2%;
  right: 1%;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const CameraIcon = styled(Camera)`
  width: 20px;
  position: absolute;
  left: 0;
  top: 130%;
  cursor: pointer;
`;
