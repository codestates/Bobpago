import MatchCard from "components/MatchCard/MatchCard";
import Circle1 from "components/MovingCircle/Circle1";
import Circle2 from "components/MovingCircle/Circle2";
import Nav from "components/Nav/Nav";
import Lineear from "components/Svg/Lineear/Lineear";
import Weather from "components/Weather/Weather";
import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  TotalMatchContainer,
  EggPago,
  MatchText,
  MatchCardScroll,
  MatchCardContainer,
  HiddenPage,
  QuestionIcons,
  MatchTextContainer,
  MatchTooltip,
} from "./styles";

const MatchingRecipe = () => {
  const dummy: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const cardRef = useRef<any>(null);
  const hiddenRef1 = useRef<any>(null);
  const tooltipRef = useRef<any>(null);
  const sliderRef = useRef<any>(null);
  const [turnOn, setTurnOn] = useState(false);
  const [wind, setWind] = useState(0);

  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleSwitch = () => {
    cardRef.current.style.transform = "translateY(120%)";
    setTimeout(() => {
      setTurnOn(!turnOn);
      hiddenRef1.current.classList.add("leftmove1");
    }, 1000);
  };

  const rotateMaker = () => {
    const rotateArr: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    let rotatePick: number =
      rotateArr[Math.floor(Math.random() * (rotateArr.length + 1))];
    return rotatePick;
  };

  const idMaker = () => {
    return Math.floor(new Date().getTime() * Math.random());
  };

  useEffect(() => {
    setWind(rotateMaker());
    cardRef.current.style.transform = "translate(0%)";
  }, []);

  return (
    <TotalMatchContainer>
      <Nav opac={true} />

      {/* 꾸미기 영역 */}
      <Weather rotateMaker={wind} />
      <EggPago src="/img/eggpago.png" />
      <Circle1 />
      <Circle2 />
      {/* 꾸미기 영역 */}

      {/* 타이틀 텍스트 */}
      <MatchTextContainer>
        <MatchText>밥파고가 추천하는 요리 레시피</MatchText>
        <QuestionIcons
          onMouseEnter={() => {
            tooltipRef.current.style.opacity = "1";
          }}
          onMouseLeave={() => {
            tooltipRef.current.style.opacity = "0";
          }}
        />
        <MatchTooltip ref={tooltipRef}>
          밥파고의 추천 알고리즘으로 <br /> 생성된 레시피입니다! <br /> 한번
          골라보세요! <br />
          <span>마우스를 이용하여 오른쪽에서 왼쪽으로 드래그 해보세요!</span>
        </MatchTooltip>
      </MatchTextContainer>
      {/* 타이틀 텍스트 */}

      {/* 페이지 스크롤 이벤트 */}
      <HiddenPage ref={hiddenRef1}></HiddenPage>
      <MatchCardScroll ref={cardRef}>
        <MatchCardContainer
          ref={sliderRef}
          onMouseDown={(e) => {
            isDown = true;
            sliderRef.current.classList.add("active");
            startX = e.pageX - sliderRef.current.offsetLeft;
            scrollLeft = sliderRef.current.scrollLeft;
          }}
          onMouseLeave={() => {
            isDown = false;
            sliderRef.current.classList.remove("active");
          }}
          onMouseUp={() => {
            isDown = false;
            sliderRef.current.classList.remove("active");
          }}
          onMouseMove={(e) => {
            if (!isDown) {
              return;
            }
            e.preventDefault();

            const x = e.pageX - sliderRef.current.offsetLeft;
            const walk = x - startX;
            sliderRef.current.scrollLeft = scrollLeft - walk;
          }}
        >
          {!turnOn
            ? dummy.map((item) => {
                return (
                  <MatchCard
                    key={item}
                    id={idMaker()}
                    wind={wind}
                    rotate={rotateMaker()}
                    handleSwitch={handleSwitch}
                  />
                );
              })
            : null}
        </MatchCardContainer>
        <Lineear />
      </MatchCardScroll>
      {/* 페이지 스크롤 이벤트 */}
    </TotalMatchContainer>
  );
};

export default MatchingRecipe;
