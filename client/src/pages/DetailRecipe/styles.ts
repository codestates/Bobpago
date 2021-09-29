import styled, { css, keyframes } from "styled-components";
import { BookmarkFill } from "@styled-icons/bootstrap/BookmarkFill";

export const pageLeftMoveAnimate = keyframes`
    0% {
      transform: translateX(0%) scale(3);
    }

    20% {
      border-radius: 87% 13% 70% 30% / 75% 30% 70% 25% ;
    }

    80% {
      border-radius: 43% 57% 0% 100% / 100% 0% 100% 0% ;
    }

    100% {
      transform: translate(100%) scale(1);
      border-radius: 0% 100% 0% 100% / 100% 0% 100% 0% ;
    }
`;

export const pinkPagoMove = (
  rotate: number,
  position: number,
  end: number
) => keyframes`
  0% {
    left: ${`${position}%`};
  }

  10% {
    /* transform: rotateZ(12deg); */
  }

  50% {
    top: ${`${end * 2}%`};
    transform: ${`rotateZ(${rotate * 1.5}deg)`}
  }

  80% {
    transform: ${`rotateZ(${-rotate}deg)`}
    
  }

  90% {
    /* transform: rotateZ(0deg); */
  }

  100% {
    left: ${`${position}%`};
  }
`;

interface HiddenProps {
  start: string;
}

interface BoxProps {
  color?: string;
  length?: number;
}

interface pagoProps {
  rotate: number;
  position: number;
  end: number;
  time: number;
}

interface BookmarkProps {
  bookmark: boolean;
}

export const EggHeadPago = styled.img<pagoProps>`
  position: fixed;
  left: 70%;
  top: 10%;
  width: 4%;
  height: 4%;
  animation: ${({ rotate, position, end }) =>
      pinkPagoMove(rotate, position, end)}
    10s infinite;
`;

export const PinkHeadPago = styled.img<pagoProps>`
  position: fixed;
  left: 70%;
  top: 10%;
  width: 4%;
  height: 4%;
  animation: ${({ rotate, position, end }) =>
      pinkPagoMove(rotate, position, end)}
    10s infinite;
`;

export const DRTotalContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  .active {
    color: orangered;
  }
`;

export const RightScroll = styled.div`
  position: fixed;
  width: 24.9%;
  height: 34.2%;
  right: 19.1%;
  top: 35.9%;
  background-color: #ececec;
  overflow: hidden;
  padding: 0 1em;
  border: 3px solid #2d325b;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  /* position: relative; */
`;

export const RightScrollContainer = styled.div`
  transition: 1s;
`;

export const RightScrollContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 262px;
`;

export const TopBoxScroll = styled.section`
  position: fixed;
  width: 50%;
  height: 75%;
  top: 0;
  left: 0;
  background-color: #dadada;
  overflow: hidden;
  transition: 1s;
`;

export const TopBoxContainer = styled.div`
  width: 100%;
  transition: 1s;
  height: 100%;
  position: relative;
  transform: translateY(0%);
`;

export const TopBoxContent = styled.div<BoxProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => {
    return color ? color : "ececec";
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftBoxScroll = styled.section`
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  height: 25%;
  width: 25%;
  overflow: hidden;
`;

export const LeftBoxContainer = styled.div<BoxProps>`
  width: ${({ length }) => {
    return length ? `${length * 100}%` : `100%`;
  }};
  transition: 1s;
  height: 100%;
  position: relative;
  transform: translateX(0%);
  display: flex;
`;

export const LeftBoxContent = styled.div<BoxProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => {
    return color ? color : "ececec";
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightBoxScroll = styled.section`
  position: fixed;
  left: 25%;
  bottom: 0;
  width: 25.05%;
  height: 25%;
  overflow: hidden;
`;

export const RightBoxContainer = styled.div<BoxProps>`
  width: ${({ length }) => {
    return length ? `${length * 100}%` : `100%`;
  }};
  transition: 1s;
  height: 100%;
  position: relative;
  transform: translateX(-100%);
  display: flex;
`;

export const RightBoxContent = styled.div<BoxProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => {
    return color ? color : "ececec";
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageScroll = styled.div`
  position: fixed;
  width: 40%;
  height: 80%;
  background-color: #ececec;
  top: 6.5em;
  left: 5%;
  z-index: 1;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;

export const ImageContainer = styled.div`
  width: 100%;
  transition: 1s;
  height: 100%;
  position: relative;
  transform: translateY(0%);
  z-index: -1;
`;

export const ImageContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
`;

export const HiddenPage = styled.div<HiddenProps>`
  width: 180%;
  height: 150%;
  background-color: #000000;
  transition: 1s;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  z-index: 1000;
  position: fixed;
  left: -18em;
  top: -5em;
  transform: translateX(0%);
  z-index: 10000;
  animation: ${({ start }) => {
    if (start === "true") {
      return css`
        ${pageLeftMoveAnimate} 2.5s forwards
      `;
    } else if (start === "false") {
      return "none";
    }
  }}; ;
`;

export const MainIngredientContainer = styled.div`
  max-width: 14.85%;
  min-width: 14.85%;
  height: 20%;
  background-color: #ececec;
  position: fixed;
  top: 50%;
  left: 80.85%;
  overflow: hidden;
  border: 3px solid #2d325b;
  border-bottom: none;
  border-left: 2px solid #2d325b;
  /* border-top-right-radius: 15px; */
  z-index: 900;
`;

export const MainIngredient = styled.div`
  width: 100%;
  transition: 1s;
  height: 100%;
  position: relative;
  transform: translateY(0%);
`;

export const MainIngredientContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    color: red;
    transform: scale(1.2);
  }
`;

export const SubIngredientContainer = styled.div`
  /* max-width: 15%; */
  min-width: 39.7%;
  height: 20%;
  background-color: #ececec;
  position: fixed;
  top: 70%;
  left: 56%;
  overflow: hidden;
  border: 3px solid #2d325b;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  z-index: 5;
`;

export const SubIngredient = styled.div`
  width: 100%;
  height: 100%;
  transition: 1s;
  position: relative;
`;

export const SubIngredientContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    color: red;
    transform: scale(1.2);
  }
`;

export const SudoContainer = styled.div`
  position: fixed;
  width: 39.7%;
  height: 68%;
  top: 22%;
  left: 56%;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const CommentButton = styled.button`
  position: fixed;
  right: 6%;
  bottom: 13%;
  width: 5em;
  height: 2.5em;
  background-color: #d43838;
  transition: 0.5s;
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  z-index: 1500;

  &:hover {
    background-color: red;
    transform: scale(1.1);
  }
`;

export const BookMarkIcon = styled(BookmarkFill)<BookmarkProps>`
  position: fixed;
  width: 25px;
  top: 23.5%;
  right: 5.5%;
  z-index: 1000;
  transition: 0.1s;
  color: ${({ bookmark }) => {
    return bookmark ? "orangered" : "orange";
  }};
  cursor: pointer;
  &:hover {
    color: orangered;
  }
  &:active {
    color: red;
  }
`;
