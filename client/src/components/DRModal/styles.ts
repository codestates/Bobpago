import styled from "styled-components";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Camera } from "@styled-icons/bootstrap/Camera";
import { main } from "theme";

interface ButtonColor {
  color?: string;
}

export const CommentModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2000;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CommentContainer = styled.div`
  position: absolute;
  width: 60%;
  height: 80%;
  left: 20%;
  top: 10%;
  background-color: rgba(230, 230, 230, 1);
  z-index: 100;
  padding: 3em 3em 2em 2em;
  border-radius: 15px;
`;

export const SudoContainer = styled.div`
  background-color: #ffffff;
  height: 85%;
  overflow: scroll;
  overflow-x: hidden;
  padding: 2em;
  border-radius: 10px;
  font-size: 1.5em;
`;
export const NoCommentContainer = styled.div`
  
  display: flex;
  justify-content: center;
  align-content: center;
`
export const NoCommentText = styled.span`
  position: relative;
  text-align: center;
  font-size: ${main.smallestFont};
  color: dimgrey;
  top: 4em;
  
`

export const PostCommentContainer = styled.div`
  position: absolute;
  bottom: 4em;
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
  font-size: 1.5em;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: -3.5em;
  right: 0;
`;

export const CommentPostButton = styled.button<ButtonColor>`
  margin-left: 1em;
  margin-top: 2em;
  padding: 0.5em;
  outline: none;
  border: none;
  background-color: ${({ color }) => {
    return color;
  }};
  font-size: 1.3em;
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
  width: 30px;
  position: absolute;
  left: 0;
  top: 130%;
  cursor: pointer;
`;

export const ImgText = styled.span`
  position: absolute;
  left: 5%;
  top: 123%;
  height: 2em;
  width: 20em;
`;
