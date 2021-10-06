import styled, { keyframes } from "styled-components";
import { main } from "theme";
import { Search } from "@styled-icons/boxicons-regular/Search";
import { QuestionCircle } from "@styled-icons/bootstrap/QuestionCircle";

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

export const ArrowMove = keyframes`
  0% {
    transform: rotateZ(45deg);
  }

  50% {
    transform: rotateZ(45deg) skew(5deg, 5deg);
  }

  100% {
    transform: rotateZ(45deg);
  }
`;

interface MyProps {
  move?: number;
  bg?: string;
}

export const MainContainer = styled.div`
  overflow: hidden;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TotalContainer = styled.section<MyProps>`
  display: flex;
  transition: 1.3s;
  transition-timing-function: cubic-bezier(1, -0.275, 0.44, 1.25);

  width: 300vw;
  transform: ${(props) => {
    return props.move ? `translate(-${props.move}px);` : "-1000px";
  }};

  section {
    flex: 1;
    height: 100vh;
  }
`; // 모든 페이지를 감싸는 컨테이너.

export const AreYouGoodPage = styled.section`
  background-color: ${main.bg};
  display: flex;
  justify-content: center;
  align-items: center;
`; // 최초 요리 실력 조사 페이지.

export const GoodCookerPage = styled.section`
  background-color: ${main.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`; // 요리를 잘하는 유저에 해당하는 페이지.

export const BadCookerPage = styled.section`
  background-color: ${main.bg};
  display: flex;
  justify-content: center;
  align-items: center;
`; // 요리를 못하는 유저에 해당하는 페이지.

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
  height: 18em;
`;

export const HeadText = styled.h1`
  flex: 1;
  font-size: ${main.biggestFont};
  z-index: 1;
  background-color: transparent;
  @media only screen and (max-width: 1024px) {
    font-size: 5.5em;
  }
  @media only screen and (max-width: 768px) {
    font-size: 4em;
  }
  @media only screen and (max-width: 480px) {
    font-size: 3em;
  }
`;

export const ChoiceContainer = styled.div`
  flex: 1;
  display: flex;
  font-size: ${main.middleFont};
  align-items: center;
  justify-content: space-around;
`;

export const Positive = styled.h1`
  z-index: 10;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    color: red;
    transform: scale(0.8);
  }
  &:active {
    transform: scale(1.5);
  }
  @media only screen and (max-width: 768px) {
    font-size: 1.2em;
  }
  @media only screen and (max-width: 480px) {
    font-size: 1em;
  }
`;

export const Negative = styled.h1`
  z-index: 10;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    color: red;
    transform: scale(0.8);
  }
  &:active {
    transform: scale(1.5);
  }
  @media only screen and (max-width: 768px) {
    font-size: 1.2em;
  }
  @media only screen and (max-width: 480px) {
    font-size: 1em;
  }
`;

export const BadCookerContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: translateY(6em);
  transition: 1.5s;
  transition-timing-function: cubic-bezier(0.98, -0.6, 0.19, 1.61);
`;

export const BadCookerTitleContainer = styled.div`
  z-index: 10;
  align-items: center;
  padding-left: 0.3em;
  font-size: 48px;
  font-weight: 700;
  width: auto;
  margin-right: 0.5em;
  @media only screen and (max-width: 768px) {
    font-size: 35px;
  }
  @media only screen and (max-width: 480px) {
    font-size: 30px;
  }
`;

export const PostButton = styled.button`
  position: absolute;
  bottom: 4.5em;
  right: 0;
  width: 8em;
  height: 2em;
  background-color: ${main.buttonColor};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  color: #ffffff;
  border-radius: 0.5em;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: ${main.smallestFont};

  &:hover {
    background-color: #a8e7ff;
    transform: scale(1.1);
    color: black;
  }
`;

export const GoodCookerContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: translateY(5.5em);
  transition: 1.5s;
  transition-timing-function: cubic-bezier(0.98, -0.6, 0.19, 1.61);
`;

export const GoodCookerForm = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 1em;
`;

export const GoodCookerTitle = styled.div`
  font-size: 48px;
  font-weight: 700;
  // margin-right: 0.5em
  width: auto;
  margin-right: 0.5em;
  @media only screen and (max-width: 1024px) {
    font-size: 35px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 25px;
  }
`;

export const GoodCookerSearchForm = styled.div`
  height: 3.5em;
  width: 20em;
  // margin-right: 1em;
  margin-top: 1em;
  margin-left: auto;
  display: flex;
  right: 0;
  align-items: center;
  position: relative;
  @media only screen and (max-width: 768px) {
    margin-top: 0.2em;
    margin-right: auto;
    margin-left: 0;
  }
`;

export const GoodCookerSearch = styled.input`
  height: 60%;
  width: 100%;
  padding-left: 1.5em;
  border: none;
  border-radius: 0.5em;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  outline: none;
  font-size: ${main.smallestFont};
  @media only screen and (max-width: 768px) {
    // font-size: 14px;
    // height: 100%;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
`;

export const SearchIcon = styled(Search)`
  width: 15px;
  position: absolute;
  left: 7px;
`;

const fadeInAnim = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: block;
    opacity: 0;
  }
  100% {
    display: block;
    opacity: 1;
  }
`;

export const TooltipContainer = styled.div`
  position: relative;
  /* transform: translate(48%, 190%); */
  width: 100%;
  display: flex;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftSurvayTooltip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  padding-top: 0.2em;
  // line-height: 2em;
  width: 10em;
  height: 90%;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid black;
  position: absolute;
  border-radius: 10px;
  opacity: 0;
  transition: 0.3s;
  z-index: 2;
  /* top: -70%; */
  // right: 15%;
  z-index: 100;
  display: none;
  animation: ${fadeInAnim} 0.3s;
  transform: translate(32em, 0em);
  @media only screen and (max-width: 1024px) {
    transform: translate(30em, 0em);
  }
  @media only screen and (max-width: 768px) {
    width: 9em;
    height: 3em;
    padding: 0em;
    transform: translate(18em, -0.3em);
  }
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
    top: 40%;
    left: -2.3%;
    background-color: #ffffff;
    transform: rotateZ(45deg);
    z-index: 1;
    transition: 0.3s;
    @media only screen and (max-width: 768px) {
      transform: translate(-0.1em, 0em) rotateZ(45deg);
    }
  }
  &:hover {
    display: block;
    opacity: 1;
    transition: 0.3s;
  }
`;

export const LeftTooltipContainer = styled.div`
  margin-top: 0.5em;
  display: flex;
`;

export const LeftQuestionIcons = styled(QuestionCircle)`
  width: 25px;
  top: 21%;
  left: 75%;
  color: black;
  animation: ${QuestionMove} 2s infinite;
  z-index: 10;
  &:hover {
    animation: normal;
    & + div {
      display: block;
      opacity: 1;
    }
  }
`;

export const RightTooltipContainer = styled.div`
  // position: absolute;
  // top: 1%;
  // left: 47%;
  display: inline-block;
  width: 100%;
  z-index: 100;
`;

export const RightSurvayTooltip = styled(LeftSurvayTooltip)`
  height: 2.5em;
  line-height: 2.5em;
  width: auto;
  padding: 0 0.8em;
  transform: translate(33em, 0.7em);
  z-index: 150;
  @media only screen and (max-width: 768px) {
    transform: translate(25em, -0.7em);
    line-height: 1.5em;
    height: 5em;
    width: 8em;
  }
  @media only screen and (max-width: 480px) {
    transform: translate(21em, -1.5em);
    line-height: 1.5em;
    height: 6em;
    width: 6em;
  }
  span {
  }
  ::before {
    @media only screen and (max-width: 768px) {
      transform: translate(-0.1em, 0em) rotateZ(45deg);
    }
  }
  &:hover {
  }
`;

export const RightQuestionIcons = styled(QuestionCircle)`
  width: 25px;
  top: 21%;
  left: 75%;
  color: black;
  animation: ${QuestionMove} 2s infinite;
  margin-right: auto;
  &:hover {
    animation: normal;
    & + div {
      display: block;
      opacity: 1;
    }
  }
`;

export const HiddenContainer = styled.div`
  width: 100%;
  height: 400vh;
  transform: scale(1.5);
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffc69b;
  z-index: 1000;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  transition: 2s;
`;

export const ArrowRight = styled.div`
  width: 40px;
  height: 40px;
  border-right: 5px solid black;
  border-top: 5px solid black;
  transform: rotateZ(45deg);
  position: absolute;
  left: 31.2%;
  top: 50%;
  z-index: 100;
  transition: 0.3s;
  cursor: pointer;
  animation: ${ArrowMove} 2s infinite;
  &:hover {
    border-right: 5px solid #00aa00;
    border-top: 5px solid #00aa00;
  }
  @media only screen and (max-width: 768px) {
    left: 30.2%;
  }
  @media only screen and (max-width: 480px) {
    left: 29.5%;
  }
`;

export const ArrowLeft = styled.div`
  width: 40px;
  height: 40px;
  border-left: 5px solid black;
  border-bottom: 5px solid black;
  transform: rotateZ(45deg);
  position: absolute;
  right: 31.2%;
  top: 50%;
  z-index: 100;
  transition: 0.3s;
  cursor: pointer;
  animation: ${ArrowMove} 2s infinite;
  &:hover {
    border-left: 5px solid #00aa00;
    border-bottom: 5px solid #00aa00;
  }
  @media only screen and (max-width: 768px) {
    right: 30.2%;
  }
  @media only screen and (max-width: 480px) {
    right: 29.5%;
  }
`;
