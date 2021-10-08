import styled from "styled-components";
import { NavigateNext } from "@styled-icons/material-rounded/NavigateNext/NavigateNext";
import { Upload } from "@styled-icons/bootstrap/Upload/Upload";

export const UploadImg = styled.img`
  cursor: pointer;
  width: 4.5em;
  height: 4.5em;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 0%);
  transition: all 0.3s ease;
  &:hover {
    transform: translate(-50%, 0%) scale(1.1);
    @media screen and (max-width: 480px) {
      transform: translate(-50%, 10%) scale(1.1) rotate(-90deg);
    }
  }
  @media screen and (max-width: 768px) {
    width: 4em;
    height: 4em;
  }
  @media screen and (max-width: 480px) {
    transform: translate(-50%, 10%) rotate(-90deg);
  }
`;

export const UploadImgText = styled.p`
  margin: 0 auto;
  width: 100%;
  width: 6em;
  font-size: 20px;
  display: block;
  position: relative;
  transform: translateY(200%);
  align-text: center;
  color: #8f8f8f;
  font-weight: 500;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const UploadIcon = styled(Upload)`
  width: 5em;
  height: 5em;
  position: absolute;
  z-index: 1;
  fill: #fff;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export const BookContainer = styled.div`
  position: absolute;
  top: 6em;
  margin: 0 auto;
  left: 0;
  right: 0;
  height: 77%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  @media screen and (max-width: 480px) {
    transform: rotate(90deg);
  }
`;

export const Cover = styled.div`
  width: 35%;
  height: 90%;
`;

export const FlipBook = styled.div`
  width: 35%;
  height: 90%;
  position: relative;
  perspective: 1500px;
  border-bottom-right-radius: 0.5em;
  border-top-right-radius: 0.5em;
  @media screen and (max-width: 768px) {
    width: 40%;
    transform: translateX(7%);
  }
  @media screen and (max-width: 480px) {
    height: 70%;
    width: 50%;
  }
`;

export const Back = styled.div`
  text-align: center;
  justify-contents: center;
  color: #000;
  transform-style: preserve-3d;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  transform: rotateY(180deg);
  box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.5) 0 2px 5px rgba(0, 0, 0, 0.5);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background-color: #d5d6ce;
  border-bottom-left-radius: 0.5em;
  border-top-left-radius: 0.5em;
`;

export const Front = styled.div`
  color: #000;
  transform-style: preserve-3d;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #f3f3f3;
  box-sizing: border-box;
  padding: 0 13px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-bottom-right-radius: 0.5em;
  border-top-right-radius: 0.5em;
`;

export const BackgroundImg = styled.img`
  position: absolute;
  opacity: 0.2;
  transform: translateX(-96%);
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const NextBtn = styled.label`
  position: absolute;
  bottom: 13px;
  right: 13px;
  cursor: pointer;
  color: #000;
`;

export const BackBtn = styled.label`
  position: absolute;
  bottom: 13px;
  right: 13px;
  cursor: pointer;
  color: #000;
`;

export const FrontCoverImg = styled.img`
  width: 70%;
  margin-top: -1em;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const FrontCoverLogo = styled.img`
  margin-top: 5%;
  width: 30%;
  bottom: 1em;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const FrontCoverBack = styled(Back)`
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
  box-shadow: -6px 0px 8px 1px rgba(0, 0, 0, 0.1);
  .uploaded {
    top: 80%;
    opacity: 0.7;
    @media screen and (max-width: 480px) {
      top: 5%;
    }
  }
  .food {
    width: auto;
    object-fit: center;
    max-height: 100%;
    @media screen and (max-width: 480px) {
      transform: rotate(-90deg);
    }
  }
`;

export const FrontCoverFront = styled(Front)`
  background: #fafafa;
  box-shadow: 3px 3px 8px 1px rgba(0, 0, 0, 0.05);
  padding-left: 0;
  padding-right: 0;
  #book-title {
    height: 15%;
    font-size: 15px;
    color: #fff;
    background: #b1d4a3;
    width: 100%;
    @media screen and (max-width: 480px) {
      transform: rotate(-90deg) translateX(-75%);
      background: transparent;
      color: grey;
    }
    h2 {
      position: relative;
      top: 30%;
    }
  }
`;

interface ImgProps {
  src: string | null;
}
export const UploadedImg = styled.img<ImgProps>`
  width: 100%;
  display: ${(props) => (props.src ? "block" : "none")};
`;

export const NextPageBtn = styled(NavigateNext)`
  width: 5em;
  position: fixed;
  right: 1em;
  fill: #6da69a;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    right: 0em;
  }
  @media screen and (max-width: 480px) {
    right: auto;
    bottom: 15%;
    transform: rotate(90deg);
  }
`;

export const PrevPageBtn = styled(NavigateNext)`
  transform: rotate(180deg);
  width: 5em;
  position: fixed;
  left: 1em;
  fill: #6da69a;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    left: 0em;
  }
  @media screen and (max-width: 480px) {
    left: auto;
    top: 10%;
    transform: rotate(-90deg);
  }
`;
export const Flip = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: left;
  transform-style: preserve-3d;
  transform: rotateY(0deg);
  transition: transform 0.7s;
  color: #fff;
  border-bottom-right-radius: 0.5em;
  border-top-right-radius: 0.5em;
`;

export const Text = styled.p`
  font-size: 14px;
  line-height: 24px;
`;

export const PageCheckBox = styled.input`
  display: none;
`;

export const FrontCover = styled(Flip)``;

interface LineHeightProps {
  lineHeight: number;
}

export const DescriptionText = styled.textarea<LineHeightProps>`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background: transparent;
  z-index: 3;
  padding-top: 0.5em;
  font-size: 150%;
  line-height: ${(props) =>
    props.lineHeight
      ? props.lineHeight + "em"
      : window.innerHeight * 0.0037 + 0.0398 + "em"};
  resize: none;
`;

interface ImgProps {
  src: string | null;
}

export const BackCover = styled(FrontCover)`
  z-index: -10;
  width: 101%;
  transform: translateX(-0.2em);
  // box-shadow: 2px 0px 8px 1px rgba(0, 0, 0, 0.2);
`;
export const BackCoverBack = styled(FrontCoverBack)``;
export const BackCoverFront = styled(FrontCoverFront)`
  background-color: #f3f3f3;
`;

export const orderArr = [
  "첫",
  "두",
  "세",
  "네",
  "다섯",
  "여섯",
  "일곱",
  "여덟",
  "아홉",
  "열",
  "열한",
  "열두",
  "열세",
  "열네",
  "열다섯",
  "열여섯",
  "열일곱",
  "열여덟",
  "열아홉",
  "스무",
];
