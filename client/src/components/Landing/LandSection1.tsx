import React from "react";
import styled from "styled-components";
import Ball from "components/Svg/Ball/Ball";
import { useHistory } from "react-router";

interface SectionTextOne {
  fontsize?: string;
  top?: string;
  left?: string;
  width?: string;
  lineLeft?: string;
  querySize?: string;
  queryTop?: string;
}

interface Section1Props {
  handlePageTransition: () => void;
}

const LandingSectionOne = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
  z-index: 10;
  background-color: #feefe6;
  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 200%;
    background-color: #ffd18a;
    right: -70%;
    bottom: -70%;
    transition: 1s;
    transform: rotateZ(-45deg);
    border-radius: 10%;
  }
  @media screen and (max-width: 768px) {
    ::before {
      width: 200%;
      height: 300%;
      right: -90%;
      background-color: #ffe0c3;
    }
  }
`;

const EggPago = styled.img`
  width: 20em;
  object-fit: contain;
`;

const BobPagoimg = styled.img`
  width: 30%;
  position: absolute;
  top: 30%;
  right: 5%;
  z-index: 10;
  opacity: 1;
  transition: 1s;
  @media screen and (max-width: 768px) {
    opacity: 0;
  }
`;

const SosegeImg = styled.img`
  width: 10%;
  position: absolute;
  top: 30%;
  right: 10%;
  transform: rotateZ(30deg);
  opacity: 1;
  transition: 1s;
  @media screen and (max-width: 768px) {
    opacity: 0;
  }
`;

const BreadImg = styled.img`
  width: 15%;
  position: absolute;
  top: 40%;
  right: 22%;
  transform: rotateZ(50deg);
  opacity: 1;
  transition: 1s;
  @media screen and (max-width: 768px) {
    opacity: 0;
  }
`;

const AllIngredientImg = styled.img`
  width: 45%;
  height: 50%;
  position: absolute;
  top: 52%;
  right: 0%;
  object-fit: contain;
  opacity: 1;
  transition: 1s;
  @media screen and (max-width: 768px) {
    opacity: 0;
  }
`;

const SectionOneTitle = styled.div<SectionTextOne>`
  font-size: ${(props) => {
    return props.fontsize ? props.fontsize : "68px";
  }};
  font-weight: 600;
  position: absolute;
  top: ${(props) => {
    return props.top ? props.top : "32%";
  }};
  left: ${(props) => {
    return props.left ? props.left : "35%";
  }};
  min-width: 55%;
  z-index: 1000;

  span {
    color: rgb(236, 122, 28);
    transition: 0.5s;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;

    :hover {
      /* width: ${(props) => {
        return props.width ? props.width : "100%";
      }}; */
      color: rgb(207, 36, 17);
    }
  }
  @media screen and (max-width: 768px) {
    font-size: 52px;
    width: 100%;
    top: ${(props) => {
      return props.queryTop ? props.queryTop : "32%";
    }};
    left: 8%;

    span {
      color: rgb(248, 88, 14);
      margin-left: 0.1em;
      margin-right: 0.1em;
      font-size: 84px;
    }
    .recipeBot {
      margin-left: 0.15em;
      font-size: 90px;
    }
  }
  @media screen and (max-width: 600px) {
    font-size: 32px;
    width: 100%;
    top: ${(props) => {
      return props.queryTop ? props.queryTop : "32%";
    }};
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: rgb(248, 88, 14);
      margin-left: 0.1em;
      margin-right: 0.1em;
      font-size: 56px;
    }
    .recipeBot {
      margin-left: 0.15em;
      font-size: 55px;
    }
  }
`;

const SectionOneButton = styled.button`
  position: absolute;
  width: 40%;
  height: 10%;
  background-color: #f75f4e;
  font-size: 42px;
  top: 75%;
  left: 8%;
  outline: none;
  border: none;
  background-image: url("/img/background2.png");
  transition: 1.5s;
  border-radius: 12px;
  background-position: 20% 0%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 1000;
  font-weight: 700;
  ::before {
    content: "";
    width: 66%;
    height: 2px;
    background-color: #ffffff;
    position: absolute;
    top: 80%;
    left: 17%;
    opacity: 0;
    transition: 1.5s;
  }
  &:hover {
    background-position: 20% 35%;
    color: #ffffff;
    ::before {
      opacity: 1;
    }
  }
  @media screen and (max-width: 768px) {
    width: 83%;
    height: 10%;
    top: 75%;
  }
`;

const LandSection1: React.FC<Section1Props> = ({ handlePageTransition }) => {
  const history = useHistory();
  const handlePageMove = () => {
    handlePageTransition();
    setTimeout(() => {
      history.push("/survey");
    }, 2000);
  };

  return (
    <LandingSectionOne>
      <SectionOneTitle
        queryTop={"25%"}
        querySize={"56px"}
        top={"25%"}
        left={"8%"}
        width={"20%"}
        lineLeft={"42%"}
      >
        밥파고는 당신의 <span>냉장고가</span> 궁금해요
      </SectionOneTitle>
      <SectionOneTitle
        queryTop={"40%"}
        querySize={"52px"}
        fontsize={"4em"}
        top={"40%"}
        left={"8%"}
        width={"17%"}
        lineLeft={"46%"}
      >
        가지고 있는 재료들로 <span>레시피</span>를 알려주는
      </SectionOneTitle>
      <SectionOneTitle
        queryTop={"55%"}
        querySize={"72px"}
        fontsize={"4em"}
        top={"55%"}
        left={"8%"}
        width={"55%"}
      >
        <span className="recipeBot">레시피 추천 로봇 밥파고</span>
      </SectionOneTitle>
      <BobPagoimg src="/img/BobpagoNosub.png" />
      <SosegeImg src="/img/sosege.png" />
      <BreadImg src="/img/bbang.png" />
      <AllIngredientImg src="/img/Allingredient.png" />
      <SectionOneButton onClick={handlePageMove}>
        지금 바로 시작하기.
      </SectionOneButton>
      {/* <Ball
        width={"80%"}
        height={"80%"}
        fill={"#f75f4e4b"}
        top={30}
        left={-20}
        opac={true}
      /> */}
    </LandingSectionOne>
  );
};

export default LandSection1;
