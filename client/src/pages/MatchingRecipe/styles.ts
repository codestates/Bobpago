import styled, { keyframes } from "styled-components";
import { QuestionCircle } from "@styled-icons/bootstrap/QuestionCircle";

export const animate = keyframes`
    0% {
        top: 8.5em;
        transform: rotate(0deg);
    }

    50% {
        top: 6.5em;
        transform: rotate(30deg);

    }

    100% {
        top: 8.5em;
        transform: rotate(0deg);
    }
`;

export const pageLeftMoveAnimate = keyframes`
    0% {
      transform: translateX(100%);
    }

    20% {
      border-radius: 87% 13% 70% 30% / 75% 30% 70% 25% ;
    }

    40% {
      border-radius: 18% 82% 27% 73% / 75% 30% 70% 25% ;
    }

    60% {
      border-radius: 100% 0% 0% 100% / 100% 0% 100% 0% ;
    }

    80% {
      border-radius: 43% 57% 0% 100% / 100% 0% 100% 0% ;
    }

    100% {
      transform: scale(3.5);
      border-radius: 0% 100% 0% 100% / 100% 0% 100% 0% ;
    }
`;

export const QuestionMove = keyframes`
  0% {
    transform: rotateZ(0deg);
  }

  50% {
    transform: rotateZ(40deg);
  }

  100% {
    transform: rotateZ(0deg);
  }
`;

export const TotalMatchContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #eeeeee;
  position: relative;
  overflow: hidden;
  .lineear {
    position: absolute;
    z-index: 1;
    left: -25%;
    top: 30%;
  }
  .leftmove1 {
    animation: ${pageLeftMoveAnimate} 3s;
    animation-fill-mode: forwards;
  }
`;

export const EggPago = styled.img`
  position: absolute;
  width: 5%;
  top: 6.5em;
  left: 5%;
  animation: ${animate} 5s linear infinite;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
`;

export const MatchTextContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 26%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const MatchTopContainer = styled.div`
  display: flex;
`;

export const MatchText = styled.div`
  font-weight: 700;
  color: #ffffff;
  font-size: 56px;
  text-shadow: -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000,
    1px 1px 2px #000;
  margin-right: 0.3em;
`;

export const MatchTooltip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  width: 15em;
  height: 8em;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid black;
  position: absolute;
  border-radius: 10px;
  opacity: 0;
  transition: 0.3s;
  top: -33%;
  left: 102%;
  z-index: 100;
  span {
    font-size: 12px;
    font-weight: 700;
    margin-top: 1em;
    color: #aa0000;
  }
  ::before {
    content: "";
    width: 10px;
    height: 10px;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    position: absolute;
    top: 45%;
    left: -2.7%;
    background-color: #ffffff;
    transform: rotateZ(45deg);
  }
`;

export const MatchCardScroll = styled.div`
  position: absolute;
  width: 100%;
  height: 70%;
  bottom: 0%;
  background: transparent;
  display: flex;
  align-items: center;
  transform: translateY(100%);
  transition: 1.3s;
  transition-timing-function: cubic-bezier(1, -0.275, 0.44, 1.25);
  /* z-index: 100; */
`;

export const MatchCardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: auto;
  z-index: 90;
  position: absolute;
  transition: 1.3s;

  ::-webkit-scrollbar {
    width: 0;
  }

  .active {
    display: flex;
    min-width: 80%;
    height: 35em;
    background-color: #ffffff;
    position: fixed;
    left: 10%;
    top: -20%;
    z-index: 100;
    transition: 0.5s;
    border-radius: 15px;
    /* transition-timing-function: cubic-bezier(1, 2, 0.44, 1.25); */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);

    ::before {
      content: "";
      width: 100%;
      height: 100%;
      background-color: #ae123a;
      position: absolute;
      left: -50%;
      top: 80%;
      z-index: -1;
      transform: rotateZ(45deg);
    }
  }
`;

export const HiddenPage = styled.div`
  width: 120%;
  height: 120%;
  background-color: #000000;
  transform: translateX(100%);
  transition: 1s;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  z-index: 1000;
`;

export const QuestionIcons = styled(QuestionCircle)`
  width: 25px;
  top: 21%;
  left: 75%;
  color: black;
  animation: ${QuestionMove} 2s infinite;

  &:hover {
    animation: normal;
  }
`;

export const MyIngredient = styled.div`
  margin-top: 0.5em;
  font-size: 24px;
`;
