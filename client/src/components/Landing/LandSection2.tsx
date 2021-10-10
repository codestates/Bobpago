import React, { useEffect } from "react";
import styled from "styled-components";

interface GifTextProps {
  translate?: string;
}

interface GifContainerProps {
  left?: string;
  right?: string;
  position?: number;
}

const LandingSectionTwo = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #feefe6;
  position: relative;
`;

const GifContainer = styled.div<GifContainerProps>`
  width: 100%;
  height: 70%;
  position: relative;
  top: 40%;
  left: ${({ position, left, right }: any) => {
    if (left !== undefined) {
      return position < 200 ? "7%" : "-10%";
    } else if (right !== undefined) {
      return position < 200 ? "7%" : "40%";
    }
  }};
  z-index: 1000;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 10%;
  z-index: 10000;
  transition: 0.7s;
  opacity: ${({ position, left, right }: any) => {
    if (left !== undefined) {
      return position < 200 ? "1" : "0";
    } else if (right !== undefined) {
      return position < 200 ? "1" : "0";
    }
  }};
  ::before {
    content: "";
    width: 0%;
    height: 1em;
    position: absolute;
    bottom: 0%;
    left: 8%;
    background: rgb(247, 95, 78);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.01) 1%,
      rgba(247, 95, 78, 1) 5%
    );
    border-radius: 20px;
    transition: 1s;
  }
  &:hover {
    ::before {
      width: 80%;
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20%;
    ::before {
      display: none;
    }
    /* opacity: 1; */
  }
`;

const GifImageContainer = styled.div`
  /* flex: 1; */
  background-color: transparent;
  padding: 1em;
  margin-right: 6em;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
`;

const GifImage = styled.img`
  width: 110%;
  height: 100%;
  background-color: transparent;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const GifTextContainer = styled.div<GifTextProps>`
  /* flex: ; */
  background-color: transparent;
  display: flex;
  flex-direction: column;
  transform: translate(0em);
  margin-right: 6em;
  background-color: #feefe68b;
  backdrop-filter: blur(2em);
  border-radius: 10%;
  padding: 5em 5em;
  padding-right: 0;
  @media screen and (max-width: 768px) {
    background-color: transparent;
    backdrop-filter: none;
    padding: 0 5em;
    margin-right: 0;
    justify-content: center;
    align-items: center;
    /* margin-left: 2em; */
  }
`;

const GifTextTitle = styled.div`
  font-size: 84px;
  flex: 3;
  display: flex;
  max-width: 100%;
  margin-bottom: 0.2em;
  font-weight: 700;
  color: #f75f4e;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  @media screen and (max-width: 768px) {
    font-size: 72px;
  }
  @media screen and (max-width: 600px) {
    font-size: 56px;
    /* margin-right: 1em; */
  }
`;

const GifTextContent = styled.div`
  display: flex;
  flex: 3;
  font-size: 36px;
  max-width: 100%;
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
  @media screen and (max-width: 600px) {
    font-size: 20px;
    /* margin-right: 1em; */
  }
`;

const LandingNecktie = styled.div`
  width: 20%;
  height: 380vh;
  background-color: #f75f4e;
  position: absolute;
  top: 20%;
  border-top-right-radius: 5em;
  border-bottom-right-radius: 50em;
  ::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    /* top: 121.2vh; */
    z-index: 1000;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-bottom-right-radius: 50em;
  }
`;

interface LandSect2Props {
  position1?: number;
  position2?: number;
  position3?: number;
  position4?: number;
}

const LandSection2: React.FC<LandSect2Props> = ({
  position1,
  position2,
  position3,
  position4,
}) => {
  return (
    <LandingSectionTwo id="section2">
      <GifContainer className="section2-1" position={position1} left="left">
        <GifImageContainer>
          <GifImage src="/img/GifSurvey.gif"></GifImage>
        </GifImageContainer>
        <GifTextContainer>
          <GifTextTitle>오늘 뭐 해먹지..?</GifTextTitle>
          <GifTextContent>
            밥파고는 이러한 고민을 대신해줍니다 🔎
          </GifTextContent>
          <GifTextContent>
            냉장고의 재료를 입력하면 밥파고가 레시피를 찾아줍니다
          </GifTextContent>
          <GifTextContent>
            자취생도 저녁 준비하시는 어머니에게도 안성맞춤
          </GifTextContent>
        </GifTextContainer>
      </GifContainer>
      <GifContainer className="section2-2" position={position2} right="right">
        <GifTextContainer>
          <GifTextTitle>다양한 레시피</GifTextTitle>
          <GifTextContent>
            🎓 우리 밥파고는 많은 레시피를 알고있습니다
          </GifTextContent>
          <GifTextContent>
            들어간 재료를 바탕으로 추천을 해줍니다
          </GifTextContent>
          <GifTextContent>
            레시피 정보를 미리보기 할 수도 있습니다
          </GifTextContent>
          <GifTextContent>요리 과정을 상세하게 볼 수 있습니다</GifTextContent>
        </GifTextContainer>
        <GifImageContainer>
          <GifImage src="/img/GifMatching.gif"></GifImage>
        </GifImageContainer>
      </GifContainer>
      <GifContainer className="section2-3" position={position3} left="left">
        <GifImageContainer>
          <GifImage src="/img/GifPosting.gif"></GifImage>
        </GifImageContainer>
        <GifTextContainer>
          <GifTextTitle>레시피 포스팅</GifTextTitle>
          <GifTextContent>
            밥파고는 새로운 레시피도 수집합니다 📜
          </GifTextContent>
          <GifTextContent>
            당신의 특별한 레시피를 밥파고에 맡겨주세요
          </GifTextContent>
          <GifTextContent>
            우리 밥파고처럼 레시피 스타가 될 수 있습니다
          </GifTextContent>
        </GifTextContainer>
      </GifContainer>
      <GifContainer className="section2-4" position={position4} right="right">
        <GifTextContainer>
          <GifTextTitle>내가 쓴 글과 북마크</GifTextTitle>
          <GifTextContent>
            ⭐️ 내가 쓴 레시피는 차곡차곡 쌓이고 있습니다.
          </GifTextContent>
          <GifTextContent>
            레시피를 쌓아가는 재미도 같이 느낄 수 있는 밥파고
          </GifTextContent>
          <GifTextContent>
            다른 사람의 레시피를 수집할 수 있는 북마크도 있어요
          </GifTextContent>
        </GifTextContainer>
        <GifImageContainer>
          <GifImage src="/img/LandingGif4.gif"></GifImage>
        </GifImageContainer>
      </GifContainer>
      <LandingNecktie></LandingNecktie>
    </LandingSectionTwo>
  );
};

export default LandSection2;
