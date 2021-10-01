import { SET_RECIPE } from "actions/Matching";
import axios from "axios";
import MatchCard from "components/MatchCard/MatchCard";
import Circle1 from "components/MovingCircle/Circle1";
import Circle2 from "components/MovingCircle/Circle2";
import Nav from "components/Nav/Nav";
import Weather from "components/Weather/Weather";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "reducers";
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
  MatchTopContainer,
  MyIngredient,
  Linear,
} from "./styles";

const MatchingRecipe = () => {
  const cardRef = useRef<any>(null);
  const hiddenRef1 = useRef<any>(null);
  const tooltipRef = useRef<any>(null);
  const sliderRef = useRef<any>(null);
  const titleTextRef = useRef<any>(null);
  const eggPagoRef = useRef<any>(null);
  const leftBallRef = useRef<any>(null);
  const rightBallRef = useRef<any>(null);

  const [turnOn, setTurnOn] = useState(false);
  const [wind, setWind] = useState(0);
  const [data, setData] = useState<object[]>([]);

  const location = useLocation<any>();
  const dispatch = useDispatch();
  // const matchState = useSelector((state: RootState) => state.MatchingReducer);

  const locationProps = location.state;
  const locationId = locationProps.map((item: any) => item.id);
  const locationIngredient = locationProps.map((item: any) => item.name);

  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleData = async () => {
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/recipe/match`,
      {
        ingredientId: locationId,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const MatchingData = data.data.data;

    setData(MatchingData);
    dispatch({ type: SET_RECIPE, payload: MatchingData });
  };

  const handleSwitch = () => {
    cardRef.current.style.transform = "translateY(120%)";
    setTimeout(() => {
      setTurnOn(!turnOn);
      hiddenRef1.current.classList.add("leftmove1");
    }, 1000);
  };

  const handleOpacity = () => {
    titleTextRef.current.style.opacity = 0;
    titleTextRef.current.style.transform = "translateY(-100%)";
    setTimeout(() => {
      titleTextRef.current.style.display = "none";
    }, 500);
  };

  const handleReturn = () => {
    titleTextRef.current.style.display = "flex";
    titleTextRef.current.style.transform = "translateY(0%)";
    titleTextRef.current.style.opacity = 1;
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
    leftBallRef.current.style.opacity = "0";
    rightBallRef.current.style.opacity = "0";
    setTimeout(() => {
      handleData();
      setWind(rotateMaker());
      cardRef.current.style.transform = "translate(0%)";
      eggPagoRef.current.style.opacity = "1";
      titleTextRef.current.style.opacity = "1";
    }, 200);
    setTimeout(() => {
      leftBallRef.current.style.transition = "1s";
      leftBallRef.current.style.opacity = "1";
      rightBallRef.current.style.transition = "1s";
      rightBallRef.current.style.opacity = "1";
    }, 1000);
  }, []);

  return (
    <TotalMatchContainer>
      <Nav opac={true} />

      {/* 꾸미기 영역 */}
      <Weather rotateMaker={wind} />
      <EggPago ref={eggPagoRef} src="/img/eggpago.png" />
      <div ref={leftBallRef}>
        <Circle1 />
      </div>
      <div ref={rightBallRef}>
        <Circle2 />
      </div>
      {/* 꾸미기 영역 */}

      {/* 타이틀 텍스트 */}
      <MatchTextContainer ref={titleTextRef}>
        <MatchTopContainer>
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
        </MatchTopContainer>
        <MyIngredient>
          내가 고른 재료:
          {locationIngredient.map((item: string, i: number) => {
            return <span key={i}> {item} </span>;
          })}
        </MyIngredient>
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
            ? data.map((item: any) => {
                return (
                  <MatchCard
                    key={item.recipe.id}
                    recipeId={item.recipe.id}
                    title={item.recipe.title}
                    level={item.recipe.level}
                    amount={item.recipe.amount}
                    thumbnail={item.recipe.thumbnail}
                    time={item.recipe.estTime}
                    views={item.recipe.views}
                    id={idMaker()}
                    wind={wind}
                    rotate={rotateMaker()}
                    handleSwitch={handleSwitch}
                    ingredients={item.ingredients}
                    handleReturn={handleReturn}
                    handleOpacity={handleOpacity}
                  />
                );
              })
            : null}
        </MatchCardContainer>
        <Linear />
      </MatchCardScroll>
      {/* 페이지 스크롤 이벤트 */}
    </TotalMatchContainer>
  );
};

export default MatchingRecipe;
