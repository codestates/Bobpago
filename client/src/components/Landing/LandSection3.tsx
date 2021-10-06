import React from "react";
import styled from "styled-components";

interface ScrollProps {
  position: number;
}

const LandingSectionFour = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #feefe6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  position: relative;

  ::before {
    width: 200%;
    height: 100%;
    background-color: #ffd18a;
    position: absolute;
    content: "";
    transform: rotateZ(-45deg);
    transition: 1s;
  }
  @media screen and (max-width: 768px) {
    ::before {
      width: 300%;
      background-color: #ffe0c3;
      transition: 1s;
    }
  }
`;

const LandingFourContainer = styled.div<ScrollProps>`
  display: flex;
  width: 90%;
  height: 90%;
  transition: 1.5s;
  position: absolute;
  opacity: ${(props) => {
    return props.position < 200 ? "1" : "0";
  }};
  bottom: ${(props) => {
    return props.position < 200 ? "5%" : "-20%";
  }};
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const LandingFourLeftContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3em;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

const LandingFourLeftGif = styled.img`
  width: 100%;
  height: 55%;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 90%;
    padding-left: 0;
    align-items: center;
  }
`;

const LandingFourRightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  flex-direction: column;
  padding-left: 5em;
  @media screen and (max-width: 768px) {
    padding-left: 0;
    align-items: center;
  }
`;

const LandingFourRightTitle = styled.div`
  font-size: 96px;
  font-weight: 700;
  color: #f75f4e;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  @media screen and (max-width: 768px) {
    font-size: 84px;
  }
  @media screen and (max-width: 600px) {
    font-size: 56px;
  }
`;

const LandingFourRightContent = styled.div`
  font-size: 32px;
  @media screen and (max-width: 768px) {
    font-size: 32px;
    transition: 1s;
  }
  @media screen and (max-width: 600px) {
    font-size: 24px;
    transition: 1s;
    /* margin-right: 1em; */
  }
`;

interface LandSection3Props {
  scrollPosition: number;
  position5: number;
}

const LandSection3: React.FC<LandSection3Props> = ({
  scrollPosition,
  position5,
}) => {
  return (
    <LandingSectionFour id="section3">
      <LandingFourContainer position={position5}>
        <LandingFourLeftContainer>
          <LandingFourLeftGif src="/img/LandingGif5.gif" />
        </LandingFourLeftContainer>
        <LandingFourRightContainer>
          <LandingFourRightTitle>모바일 기기 지원</LandingFourRightTitle>
          <LandingFourRightContent>
            모바일 환경에서도 밥파고를 만나볼 수 있습니다📱
            <br />
            요리를 할 때에도 밥파고는 당신과 함께합니다
            <br />
            가벼운 마음으로 요리를 시작해보세요!
            <br />
            오늘 한 끼도 해결 완료~ 🍲
            <br />
          </LandingFourRightContent>
        </LandingFourRightContainer>
      </LandingFourContainer>
    </LandingSectionFour>
  );
};

export default LandSection3;
