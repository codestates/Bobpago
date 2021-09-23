import styled from "styled-components";
import { main } from "theme";
import { Search } from "@styled-icons/boxicons-regular/Search";

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
  height: 15em;
`;

export const HeadText = styled.h1`
  flex: 1;
  font-size: 68px;
  z-index: 1;
  background-color: transparent;
`;

export const ChoiceContainer = styled.div`
  flex: 1;
  display: flex;
  font-size: 32px;
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
  transform: translateY(4.5em);
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
  bottom: 15%;
  right: 0;
  width: 10em;
  height: 2.5em;
  background-color: #ce1616;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  color: #ffffff;
  border-radius: 2px;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: red;
    transform: scale(1.1);
  }
`;

export const GoodCookerContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: translateY(5.5em);
`;

export const GoodCookerForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`;

export const GoodCookerTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-right: 2em;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const GoodCookerSearchForm = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const GoodCookerSearch = styled.input`
  height: 90%;
  width: 100%;
  padding-left: 2em;
  border: none;
  border-radius: 2px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  outline: none;
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
