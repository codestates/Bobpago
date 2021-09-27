import styled, { css, keyframes } from "styled-components";

export const pageLeftMoveAnimate = keyframes`
    0% {
      transform: translateX(0%) scale(3);
    }

    20% {
      border-radius: 87% 13% 70% 30% / 75% 30% 70% 25% ;
    }

    /* 40% {
      border-radius: 18% 82% 27% 73% / 75% 30% 70% 25% ;
    }

    60% {
      border-radius: 100% 0% 0% 100% / 100% 0% 100% 0% ;
    } */

    80% {
      border-radius: 43% 57% 0% 100% / 100% 0% 100% 0% ;
    }

    100% {
      transform: translate(100%) scale(1);
      border-radius: 0% 100% 0% 100% / 100% 0% 100% 0% ;
    }
`;

interface HiddenProps {
  start: string;
}

interface BoxProps {
  color?: string;
  length?: number;
}

export const DRTotalContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const RightScroll = styled.div`
  position: fixed;
  width: 24.9%;
  height: 262px;
  right: 19.1%;
  top: 35.9%;
  background-color: #ececec;
  overflow: hidden;
  padding: 0 1em;
  border: 1px solid #2d325b;
  z-index: 1000;
`;

export const RightScrollContainer = styled.div`
  transition: 1s;
`;

export const RightScrollContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
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
  z-index: 10;
  border-radius: 10px;
  overflow: hidden;
`;

export const ImageContainer = styled.div`
  width: 100%;
  transition: 1s;
  height: 100%;
  position: relative;
  transform: translateY(0%);
`;

export const ImageContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
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
  transform: translateX(100%);
  /* animation: ${({ start }) => {
    if (start === "true") {
      return css`
        ${pageLeftMoveAnimate} 2.5s forwards
      `;
    } else if (start === "false") {
      return "none";
    }
  }}; ; */
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
  border: 1px solid #2d325b;
  border-bottom: none;
  border-left: none;
  border-top-right-radius: 15px;
  z-index: 900;
`;

export const MainIngredient = styled.div`
  width: 100%;
  transition: 1s;
  height: 100%;
  position: relative;
  transform: translateY(-100%);
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
  border: 1px solid #2d325b;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  z-index: 500;
`;

export const SubIngredient = styled.div``;

export const SudoContainer = styled.div`
  position: fixed;
  width: 36%;
  height: 68%;
  top: 22%;
  left: 56%;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
