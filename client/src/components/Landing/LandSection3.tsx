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
  }
`;

const LandingFourContainer = styled.div<ScrollProps>`
  display: flex;
  width: 90%;
  height: 90%;
  transition: 1.5s;
  position: absolute;
  opacity: ${(props) => {
    return props.position > 3650 ? "1" : "0";
  }};
  bottom: ${(props) => {
    return props.position > 3650 ? "5%" : "-50%";
  }};
`;

const LandingFourLeftContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3em;
`;

const LandingFourLeftGif = styled.img`
  width: 100%;
  height: 55%;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
`;

const LandingFourRightContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
  padding-left: 5em;
`;

const LandingFourRightTitle = styled.div`
  font-size: 96px;
  font-weight: 700;
  color: #f75f4e;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
`;

const LandingFourRightContent = styled.div`
  font-size: 32px;
`;

interface LandSection3Props {
  scrollPosition: number;
}

const LandSection3: React.FC<LandSection3Props> = ({ scrollPosition }) => {
  return (
    <LandingSectionFour>
      <LandingFourContainer position={scrollPosition}>
        <LandingFourLeftContainer>
          <LandingFourLeftGif src="/img/LandingGif5.gif" />
        </LandingFourLeftContainer>
        <LandingFourRightContainer>
          <LandingFourRightTitle>상세한 레시피 정보</LandingFourRightTitle>
          <LandingFourRightContent>
            어렵지 않게 잘 정리되어 있는 레시피들을 이용해보세요! <br />
            밥파고에 있는 레시피들은 다 잘 정리 되어있어서, <br />
            사진과 레시피 내용을 보면서 요리를 만든다면 <br />
            오늘 저녁 메뉴에 대한 걱정은 없을거에요! <br />
            시간과 난이도도 잘 정리되어 있습니다.
          </LandingFourRightContent>
        </LandingFourRightContainer>
      </LandingFourContainer>
    </LandingSectionFour>
  );
};

export default LandSection3;
