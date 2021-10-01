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
  font-size: ${main.mostbigFont};
  z-index: 1;
  background-color: transparent;
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
  flex: 1;
  z-index: 10;
  display: flex;
  align-items: center;
  padding-left: 0.3em;
  font-size: 32px;
  font-weight: 700;
`;

export const PostButton = styled.button`
  position: absolute;
  bottom: 12%;
  right: 0;
  width: 8em;
  height: 2em;
  background-color: ${main.buttonColor};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  color: #ffffff;
  border-radius: 2px;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 20px;

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
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`;

export const GoodCookerTitle = styled.div`
  font-size: 48px;
  font-weight: 700;
  margin-right: 0.5em;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const GoodCookerSearchForm = styled.div`
  height: 100%;
  width: 20%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const GoodCookerSearch = styled.input`
  height: 60%;
  width: 100%;
  padding-left: 1.5em;
  border: none;
  border-radius: 2px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  outline: none;
  font-size: ${main.mostSmallFont};
  @media only screen and (max-width: 768px) {
    font-size: 14px;
    height: 100%;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
`;

export const SearchIcon = styled(Search)`
  width: 15px;
  position: absolute;
  left: 7px;
`;

export const TooltipContainer = styled.div`
  position: relative;
  /* transform: translate(48%, 190%); */
  width: 100%;
  display: flex;
`;

export const LeftSurvayTooltip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  width: 25%;
  height: 100%;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid black;
  position: absolute;
  border-radius: 10px;
  opacity: 0;
  transition: 0.3s;
  /* top: -70%; */
  right: 15%;
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
    top: 40%;
    left: -2.3%;
    background-color: #ffffff;
    transform: rotateZ(45deg);
  }
`;

export const LeftQuestionIcons = styled(QuestionCircle)`
  width: 25px;
  top: 21%;
  left: 75%;
  color: black;
  animation: ${QuestionMove} 2s infinite;

  &:hover {
    animation: normal;
  }
`;

export const RightTooltipContainer = styled.div`
  position: absolute;
  top: 1%;
  left: 47%;
  width: 100%;
  z-index: 100;
`;

export const RightSurvayTooltip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  width: 25%;
  height: 200%;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid black;
  position: absolute;
  border-radius: 10px;
  opacity: 0;
  transition: 0.3s;
  top: -70%;
  left: 3.5%;
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
    top: 40%;
    left: -2.15%;
    background-color: #ffffff;
    transform: rotateZ(45deg);
  }
`;

export const RightQuestionIcons = styled(QuestionCircle)`
  width: 25px;
  top: 21%;
  left: 75%;
  color: black;
  animation: ${QuestionMove} 2s infinite;

  &:hover {
    animation: normal;
  }
`;
