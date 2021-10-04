import React from "react";
import styled from "styled-components";

interface GifTextProps {
  translate?: string;
}

interface GifContainerProps {
  scrollPosition?: number;
  left?: string;
  right?: string;
  position: number;
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
  left: ${({ scrollPosition, position, left, right }: any) => {
    if (left !== undefined) {
      return scrollPosition > position ? "7%" : "-10%";
    } else if (right !== undefined) {
      return scrollPosition > position ? "7%" : "40%";
    }
  }};
  z-index: 1000;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 10%;
  z-index: 10000;
  transition: 1.2s;
  opacity: ${({ scrollPosition, position, left, right }: any) => {
    if (left !== undefined) {
      return scrollPosition > position ? "1" : "0";
    } else if (right !== undefined) {
      return scrollPosition > position ? "1" : "0";
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
`;

const GifImageContainer = styled.div`
  /* flex: 1; */
  background-color: transparent;
  padding: 1em;
  margin-right: 6em;
`;

const GifImage = styled.img`
  width: 110%;
  height: 100%;
  background-color: transparent;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
`;

const GifTextContent = styled.div`
  display: flex;
  flex: 3;
  font-size: 36px;
  max-width: 100%;
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
  scrollPosition: number;
}

const LandSection2: React.FC<LandSect2Props> = ({ scrollPosition }) => {
  return (
    <LandingSectionTwo>
      <GifContainer scrollPosition={scrollPosition} position={740} left="left">
        <GifImageContainer>
          <GifImage src="/img/LandingGif1.gif"></GifImage>
        </GifImageContainer>
        <GifTextContainer>
          <GifTextTitle>오늘 뭐 해먹지..?</GifTextTitle>
          <GifTextContent>
            밥파고는 이러한 고민들을 줄이기 위해 탄생했습니다!
          </GifTextContent>
          <GifTextContent>
            냉장고에 재료를 입력하면 밥파고가 레시피를 찾아준다니까요!
          </GifTextContent>
          <GifTextContent>
            혼자 사는 자취생도 저녁 준비하시는 어머니에게도 대추천!
          </GifTextContent>
        </GifTextContainer>
      </GifContainer>
      <GifContainer
        scrollPosition={scrollPosition}
        position={1300}
        right="right"
      >
        <GifTextContainer>
          <GifTextTitle>다양한 레시피</GifTextTitle>
          <GifTextContent>
            저희 밥파고는 똑똑해서 많은 레시피를 알고있습니다!
          </GifTextContent>
          <GifTextContent>
            들어간 재료를 생각해서 알아서 추천을 해준답니다~
          </GifTextContent>
          <GifTextContent>
            또 레시피에 대한 내용들도 엄청 상세하게 되있다니까요!
          </GifTextContent>
        </GifTextContainer>
        <GifImageContainer>
          <GifImage src="/img/LandingGif2.gif"></GifImage>
        </GifImageContainer>
      </GifContainer>
      <GifContainer scrollPosition={scrollPosition} position={2100} left="left">
        <GifImageContainer>
          <GifImage src="/img/LandingGif3.gif"></GifImage>
        </GifImageContainer>
        <GifTextContainer>
          <GifTextTitle>레시피 포스팅</GifTextTitle>
          <GifTextContent>
            내가 진짜 너무 맛있게 먹은 요리를 공유하고 싶을 때!
          </GifTextContent>
          <GifTextContent>
            나의 레시피를 남들에게 알려주기 위한 특별 기능!
          </GifTextContent>
          <GifTextContent>여러분만의 레시피를 공유해보세요!</GifTextContent>
          <GifTextContent> 더 많이 밥파고가 추천해줍니다!</GifTextContent>
        </GifTextContainer>
      </GifContainer>
      <GifContainer
        scrollPosition={scrollPosition}
        position={2650}
        right="right"
      >
        <GifTextContainer>
          <GifTextTitle>내가 쓴 글과 북마크</GifTextTitle>
          <GifTextContent>
            내가 쓴 글은 차곡차곡 내 페이지에 쌓이고 있답니다.
          </GifTextContent>
          <GifTextContent>
            레시피를 쌓아가는 재미도 같이 느낄 수 있는 밥파고!
          </GifTextContent>
          <GifTextContent>
            다른 사람의 레시피도 볼 수 있게 북마크 목록이 있어요!
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
