import Nav from "components/Nav/Nav";
import React, { useRef } from "react";
import {
  MainContainer,
  TotalContainer,
  AreYouGoodPage,
  GoodCookerPage,
  BadCookerPage,
  TextContainer,
  HeadText,
  ChoiceContainer,
  Positive,
  Negative,
  BadCookerContainer,
  BadCookerTitleContainer,
  PostButton,
  GoodCookerContainer,
  GoodCookerForm,
  GoodCookerTitle,
  GoodCookerSearchForm,
  GoodCookerSearch,
  SearchIcon,
  LeftSurvayTooltip,
  LeftQuestionIcons,
  TooltipContainer,
  RightSurvayTooltip,
  RightQuestionIcons,
  RightTooltipContainer,
  LeftTooltipContainer,
  HiddenContainer,
  ArrowRight,
  ArrowLeft,
} from "./styles";

import Ball from "components/Svg/Ball/Ball";
import { useState } from "react";
import { useEffect } from "react";
import Ingredient from "components/Ingredient/Ingredient";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CLICK_DATA, GET_FILTER_DATA } from "actions/IngredientAction";
import { RootState } from "reducers";
import { useHistory } from "react-router-dom";
import { notify } from "actions/Notification";

const Survay = () => {
  const [move, setmove] = useState<number>(window.innerWidth);
  const [left, setLeft] = useState<boolean>(false);
  const [right, setRight] = useState<boolean>(false);
  const [ball, setBall] = useState<boolean>(true);
  const clickState = useSelector(
    (state: RootState) => state.IngredientClickReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const tooltipRightRef = useRef<any>(null);
  const goodCookerRef = useRef<any>(null);
  const badCookerRef = useRef<any>(null);
  const hiddenRef = useRef<any>(null);
  const goodRightBtnRef = useRef<any>(null);
  const badLeftBtnRef = useRef<any>(null);

  // 최초에 무브 컨테이너를 가운데로 두기위해서 사용한 useState이며, type은 number로 선언한다.

  // resize 이벤트가 일어날 때, 위치들이 망가지는 것을 바로잡기 위해서 resize가 일어날 때마다,
  // move를 다시 한번 고정시킨다.
  // bug #1 다 좋은데 페이지가 이동한 후에 리사이즈를 한다면 최초 설문조사로 넘어간다는 단점.
  // 해결하기 위해서는 전에 위치를 알아두는 방법도 필요할 듯.
  //     #2 리사이즈 이벤트가 발생하면 리렌더가 너무 많이되서 성능 저하 및 페이지가 터져버림.

  // solve #2 debounce를 이용해서 해결. useEffect를 이용한 debounce
  // 디바운스는 리사이즈 이벤트 같은 것들이 너무 많이 실행될 때 사용하는데, 리사이즈가 끝나는 순간 딱 한번만
  // 이벤트를 실행시킨다. 코드가 살짝 이해하기 어렵고 난잡함. 그래서 사용은 했으나 이해하기까지 시간 필요.

  // 참고 : https://velog.io/@ranisol/React-hook%EC%97%90-Resize%EC%9D%B4%EB%B2%A4%ED%8A%B8-Debounce

  const handlePositive = () => {
    if (!left) {
      setmove(0.1);
      setLeft(true);
    }
  };

  const handleNegative = () => {
    if (!right) {
      setmove(move * 2);
      setRight(true);
    }
  };

  const handleSearch = (payload: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: GET_FILTER_DATA, payload: payload.target.value });
  };

  const handlePageMove = () => {
    if (clickState.clickData.length >= 3) {
      goodCookerRef.current.style.transform = "translateY(100%)";
      badCookerRef.current.style.transform = "translateY(100%)";
      goodRightBtnRef.current.style.opacity = "0";
      badLeftBtnRef.current.style.opacity = "0";
      setBall(false);
      setTimeout(() => {
        history.push({
          pathname: "/matching",
          state: clickState.clickData,
        });
      }, 1500);
    } else {
      dispatch(notify("재료를 3개 이상 골라주셔야 합니다!"));
    }
  };

  const handleAreUGood = () => {
    setmove(window.innerWidth);
    if (left) {
      setLeft(false);
    } else if (right) {
      setRight(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      hiddenRef.current.style.left = "130%";
      hiddenRef.current.style.transform = "scale(1.2)";
    }, 100);
    dispatch({ type: CLEAR_CLICK_DATA });
  }, []);

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    let windowSizer = () => {
      resizeTimer = setTimeout(() => {
        if (left) {
        } else if (right) {
          setmove(window.innerWidth * 2);
        } else {
          setmove(window.innerWidth);
        }
      }, 300);
    };
    window.addEventListener("resize", windowSizer);
    return () => {
      window.removeEventListener("resize", windowSizer);
    };
  }, [move]);

  return (
    <>
      <Nav opac={true} />
      <MainContainer>
        <HiddenContainer ref={hiddenRef} />
        <TotalContainer move={move}>
          <Ball
            width={"1000"}
            height={"1000"}
            fill={"#a0c065"}
            top={30}
            left={50}
            opac={ball}
          />
          <Ball
            width={"1000"}
            height={"1000"}
            fill={"#5990a5"}
            top={30}
            left={175}
            opac={ball}
          />
          <Ball
            width={"200"}
            height={"200"}
            fill={"#fa5827"}
            top={10}
            left={140}
            opac={ball}
          />
          <GoodCookerPage>
            <ArrowRight onClick={handleAreUGood} ref={goodRightBtnRef} />
            <GoodCookerContainer ref={goodCookerRef}>
              <GoodCookerForm>
                <TooltipContainer>
                  <LeftTooltipContainer>
                    <GoodCookerTitle>
                      냉장고와 찬장에 있는 재료를 골라주세요!
                    </GoodCookerTitle>
                    <LeftQuestionIcons />
                    <LeftSurvayTooltip>
                      최소한 3개의 재료를 선택해야 넘어갈 수 있습니다!
                    </LeftSurvayTooltip>
                  </LeftTooltipContainer>
                  <GoodCookerSearchForm>
                    <GoodCookerSearch
                      onChange={(e: any) => {
                        handleSearch(e);
                      }}
                      placeholder="식재료를 검색해보세요!"
                    ></GoodCookerSearch>
                    <SearchIcon />
                  </GoodCookerSearchForm>
                </TooltipContainer>
              </GoodCookerForm>
              <Ingredient check="Good" />
              <PostButton onClick={handlePageMove}>레시피 찾기</PostButton>
            </GoodCookerContainer>
          </GoodCookerPage>
          <AreYouGoodPage>
            <TextContainer>
              <HeadText>요리에 일가견이 있으신가요?</HeadText>
              <ChoiceContainer>
                <Positive onClick={handlePositive}>YES</Positive>
                <Negative onClick={handleNegative}>NO</Negative>
              </ChoiceContainer>
            </TextContainer>
          </AreYouGoodPage>
          <BadCookerPage>
            <ArrowLeft onClick={handleAreUGood} ref={badLeftBtnRef} />
            <BadCookerContainer ref={badCookerRef}>
              {/* <RightTitleContainer> */}
              <BadCookerTitleContainer>
                냉장고와 찬장에 있는 재료를 골라주세요!
              </BadCookerTitleContainer>
              <RightTooltipContainer>
                <RightQuestionIcons
                  onMouseEnter={() => {
                    tooltipRightRef.current.style.opacity = "1";
                  }}
                  onMouseLeave={() => {
                    tooltipRightRef.current.style.opacity = "0";
                  }}
                />
                <RightSurvayTooltip ref={tooltipRightRef}>
                  최소한 3개의 재료를 선택해야 넘어갈 수 있습니다!
                </RightSurvayTooltip>
              </RightTooltipContainer>
              {/* </RightTitleContainer> */}
              <Ingredient check="Bad" />
              <PostButton onClick={handlePageMove}>레시피 찾기</PostButton>
            </BadCookerContainer>
          </BadCookerPage>
        </TotalContainer>
      </MainContainer>
    </>
  );
};

export default Survay;
