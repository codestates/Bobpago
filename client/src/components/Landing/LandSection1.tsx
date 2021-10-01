import React from "react";
import styled from "styled-components";
import Ball from "components/Svg/Ball/Ball";

interface SectionTextOne {
  fontsize?: string;
  top?: string;
  left?: string;
  width?: string;
  lineLeft?: string;
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
`;

const SosegeImg = styled.img`
  width: 10%;
  position: absolute;
  top: 30%;
  right: 10%;
  transform: rotateZ(30deg);
`;

const BreadImg = styled.img`
  width: 15%;
  position: absolute;
  top: 40%;
  right: 22%;
  transform: rotateZ(50deg);
`;

const AllIngredientImg = styled.img`
  width: 45%;
  height: 50%;
  position: absolute;
  top: 52%;
  right: 0%;
  object-fit: contain;
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
  max-width: 55%;
  z-index: 1000;

  span {
    color: rgb(236, 122, 28);
    transition: 0.5s;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;

    ::before {
      width: 0;
      height: 3px;
      background-color: #fa1d04;
      content: "";
      position: absolute;
      top: 94%;
      left: ${(props) => {
        return props.lineLeft ? props.lineLeft : "0";
      }};
      border-radius: 20%;
      transition: 0.5s;
    }
    :hover {
      width: ${(props) => {
        return props.width ? props.width : "100%";
      }};
      color: rgb(207, 36, 17);
      ::before {
        width: ${(props) => {
          return props.width ? props.width : "100%";
        }};
      }
    }
  }
`;

const SectionOneButton = styled.button`
  position: absolute;
  width: 35%;
  height: 6%;
  background-color: #f75f4e;
  font-size: 24px;
  top: 85%;
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
`;

const LandSection1 = () => {
  return (
    <LandingSectionOne>
      <SectionOneTitle left={"8%"} width={"48%"} lineLeft={"52%"}>
        {/* 지금 냉장고에 있는 <span>재료를 골라보세요!</span> */}
      </SectionOneTitle>
      <SectionOneTitle
        fontsize={"4em"}
        top={"48%"}
        left={"8%"}
        width={"17%"}
        lineLeft={"54%"}
      >
        {/* 가지고 있는 재료들로 <span>레시피</span>를 알려주는 */}
      </SectionOneTitle>
      <SectionOneTitle fontsize={"4em"} top={"64%"} left={"8%"}>
        {/* <span>레시피 추천 로봇 밥파고</span> */}
      </SectionOneTitle>
      <BobPagoimg src="/img/BobpagoNosub.png" />
      <SosegeImg src="/img/sosege.png" />
      <BreadImg src="/img/bbang.png" />
      <AllIngredientImg src="/img/Allingredient.png" />
      <SectionOneButton>지금 바로 시작하기.</SectionOneButton>
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
