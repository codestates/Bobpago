import { SET_RECIPE } from "actions/Matching";
import axios from "axios";
import MatchCard from "components/MatchCard/MatchCard";
import Circle1 from "components/MovingCircle/Circle1";
import Circle2 from "components/MovingCircle/Circle2";
import Nav from "components/Nav/Nav";
import Weather from "components/Weather/Weather";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
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
  NoMatchingContainer,
  NoMatchingText,
  SudoNoContainer,
  ArrowLeftIcon,
  LoadingContainer,
  LoadingContent,
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
  const noSudoRef = useRef<any>(null);
  const linearRef = useRef<any>(null);

  const [turnOn, setTurnOn] = useState(false);
  const [wind, setWind] = useState(0);
  const [data, setData] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [isBlocking, setIsBlocking] = useState<boolean>(false);

  const location = useLocation<any>();
  const dispatch = useDispatch();
  const history = useHistory();

  const locationProps = location.state;
  const locationId = locationProps.map((item: any) => item.id);
  const locationIngredient = locationProps.map((item: any) => item.name);

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
      // setTurnOn(!turnOn);
      hiddenRef1.current.classList.add("leftmove1");
    }, 800);
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

  const handlePageUp = () => {
    cardRef.current.style.transform = "translate(0%)";
    eggPagoRef.current.style.opacity = "1";
    titleTextRef.current.style.opacity = "1";
    leftBallRef.current.style.transition = "1s";
    leftBallRef.current.style.opacity = "1";
    rightBallRef.current.style.transition = "1s";
    rightBallRef.current.style.opacity = "1";
  };

  const rotateMaker = () => {
    const rotateArr: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    let rotatePick: number =
      rotateArr[Math.floor(Math.random() * (rotateArr.length - 1))];
    return rotatePick;
  };

  const idMaker = () => {
    return Math.floor(new Date().getTime() * Math.random());
  };

  const handlePageBack = () => {
    cardRef.current.style.transform = "translateY(120%)";
    setTimeout(() => {
      hiddenRef1.current.classList.add("leftmove1");
      hiddenRef1.current.style.backgroundColor = "#ffc69b";
    }, 400);
    setTimeout(() => {
      history.push("/survey");
    }, 2000);
  };

  useEffect(() => {
    // if (
    //   cardRef.current !== null &&
    //   hiddenRef1.current !== null &&
    //   tooltipRef.current !== null &&
    //   sliderRef.current !== null &&
    //   titleTextRef.current !== null &&
    //   eggPagoRef.current !== null &&
    //   leftBallRef.current !== null &&
    //   rightBallRef.current !== null
    // ) {
    leftBallRef.current.style.opacity = "0";
    rightBallRef.current.style.opacity = "0";
    setTimeout(() => {
      handleData();
      setWind(rotateMaker());
      handlePageUp();
    }, 200);
    // } // page up after render.

    handleData();
    setLoading(true);
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      linearRef.current.style.opacity = "1";
      let handleWheel: boolean = false;

      sliderRef.current.addEventListener("mousewheel", (e: any) => {
        e.preventDefault();
        const container = sliderRef.current;
        const containerScrollPosition = sliderRef.current.scrollLeft;

        container.scrollTo({
          top: 0,
          left: containerScrollPosition + e.deltaY,
        });
        handleWheel = true;
      });
      if (handleWheel) {
        return () => {
          sliderRef.current.removeEventListener("mousewheel", (e: any) => {
            e.preventDefault();
            const container = sliderRef.current;
            const containerScrollPosition = sliderRef.current.scrollLeft;

            container.scrollTo({
              top: 0,
              left: containerScrollPosition + e.deltaY,
            });
          });
        };
      }
    }
  }, [data]);

  // useEffect(() => {
  //   const unblock = history.block((location, action): any => {
  //     if (action === "POP" && isBlocking) {
  //       return window.confirm("뒤로 가겠습니까?");
  //     }
  //     return true;
  //   });

  //   return () => unblock();
  // }, [isBlocking]);

  // useEffect(() => {
  //   setIsBlocking(true);
  // }, []);

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
            <div>
              밥파고의 추천 알고리즘으로
              <br />
              생성된 레시피입니다!
              <br />
              한번 골라보세요!
            </div>
            <span>
              마우스 휠을 이용하여
              <br /> 오른쪽에서 왼쪽으로 스크롤 해보세요!
            </span>
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
        {loading === false ? (
          <LoadingContainer>
            <LoadingContent>로딩중...</LoadingContent>
          </LoadingContainer>
        ) : data.length > 0 ? (
          <MatchCardContainer ref={sliderRef} id="container">
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
        ) : (
          <NoMatchingContainer>
            <NoMatchingText
              onMouseOver={(e: any) => {
                noSudoRef.current.style.left = "0%";
              }}
              onMouseLeave={(e: any) => {
                noSudoRef.current.style.left = "100%";
              }}
            >
              <span>매칭된 레시피가 없습니다 😢</span>
              <SudoNoContainer onClick={handlePageBack} ref={noSudoRef}>
                <div>
                  <ArrowLeftIcon />
                  다시 한번 재료 선택하기
                </div>
              </SudoNoContainer>
            </NoMatchingText>
          </NoMatchingContainer>
        )}
        <Linear ref={linearRef} />
      </MatchCardScroll>

      {/* 페이지 스크롤 이벤트 */}
    </TotalMatchContainer>
  );
};

export default MatchingRecipe;
