import DRContainer from "components/DRContainer/DRContainer";
import DRContent from "components/DRContent/DRContent";
import Nav from "components/Nav/Nav";
import React, { useEffect, useRef, useState } from "react";
import {
  DRTotalContainer,
  RightScroll,
  RightScrollContainer,
  RightScrollContent,
  TopBoxScroll,
  TopBoxContainer,
  TopBoxContent,
  LeftBoxScroll,
  LeftBoxContainer,
  LeftBoxContent,
  RightBoxScroll,
  RightBoxContainer,
  RightBoxContent,
  ImageContainer,
  ImageScroll,
  ImageContent,
  HiddenPage,
  MainIngredient,
  SubIngredient,
  MainIngredientContainer,
  MainIngredientContent,
  SubIngredientContainer,
  SudoContainer,
  CommentButton,
  SubIngredientContent,
  PinkHeadPago,
  EggHeadPago,
  BookMarkIcon,
  TotalPageMap,
  TotalPageMapContainer,
  TotalPageMapContent,
  Loading,
} from "./styles";
import { koreaRed, koreaBlue, koreaYellow } from "koreaTheme";
import { gsap } from "gsap/dist/gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import DRModal from "components/DRModal/DRModal";
import { showSignIn } from "actions/SignUpAndSignIn";
import axios from "axios";
import { SET_DETAIL_DATA } from "actions/DetailRecipe";

const DetailRecipe = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const locationProps = location.state;
  const loginState = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const recipeState = useSelector(
    (state: RootState) => state.DetailRecipeReducer
  );

  const [start, setStart] = useState<boolean>(false);
  const [dummy, setDummy] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [recipeData, setRecipeData] = useState<any>(null);

  const rightScrollRef = useRef<any>(null);
  const bookmarkRef = useRef<any>(null);
  const topBoxRef = useRef<any>(null);
  const leftBoxRef = useRef<any>(null);
  const rightBoxRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const mainRef = useRef<any>(null);
  const subRef = useRef<any>(null);

  const handleBookmark = () => {
    const bookmarkState = [...bookmarkRef.current.classList].includes("active");
    if (loginState.accessToken === "") {
      dispatch(showSignIn());
    } else if (bookmarkState) {
      bookmarkRef.current.classList.remove("active");
    } else {
      bookmarkRef.current.classList.add("active");
    }
  };

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const handleModalClose = () => {
    setModalOpen(!modalOpen);
  };

  const colorMaker = (koreaColor: string[]) => {
    const L = koreaColor.length; // 총 길이
    const Random = Math.floor(Math.random() * (L - 1));
    return "#" + koreaColor[Random];
  };

  const rotateMaker = () => {
    // 파고 기울기 조절
    const numberArr: number[] = [
      -90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60,
      70, 80, 90,
    ];
    const randomPick: number = Math.floor(Math.random() * numberArr.length - 1);
    return numberArr[randomPick];
  };

  const positionMaker = () => {
    // 파고 시작 위치 조절
    const positionArr: number[] = [];
    for (let i = 50; i <= 100; i++) {
      positionArr.push(i);
    }
    const randomPick: number = Math.floor(
      Math.random() * positionArr.length - 1
    );

    return positionArr[randomPick];
  };

  const endPositionMaker = () => {
    // 파고 마지막 위치 조절
    return Math.floor(Math.random() * 10);
  };

  const pagoTimeMaker = () => {
    return Math.floor(Math.random() * 5 + 3);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePageData = async () => {
    const data = await axios.get(
      `http://localhost:3000/recipe/${locationProps}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const descriptions = data.data.data.recipe.descriptions;
    let dummyData: number[] = [];
    for (let i = 0; i < descriptions.length; i++) {
      dummyData.push(descriptions[i]);
    }
    setRecipeData(data.data.data);
    setDummy(dummyData);
  };

  useEffect(() => {
    handlePageData();
  }, []);

  useEffect(() => {
    // console.log(recipeData);
  }, [handlePageData]);

  useEffect(() => {
    if (recipeData !== null) {
      gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
      setLoading(false);
      return () => {};
    }
  }, [recipeData]);

  useEffect(() => {
    if (loading === false) {
      dispatch({ type: SET_DETAIL_DATA, payload: recipeData });
      setStart(true);
      const totalLength = recipeData.recipe.descriptions.length;
      const moveRatio = 100 / totalLength;

      const goToSection = (i: number, anim?: any) => {
        gsap.to(window, {
          scrollTo: { y: i * window.innerHeight, autoKill: false },
          duration: 0.5,
        });
        const image = document.body.querySelector(
          ".image"
        ) as HTMLParagraphElement;
        const rightScroll = document.body.querySelector(
          ".rightScroll"
        ) as HTMLParagraphElement;
        const topBox = document.body.querySelector(
          ".topbox"
        ) as HTMLParagraphElement;
        const leftBox = document.body.querySelector(
          ".leftbox"
        ) as HTMLParagraphElement;
        const rightBox = document.body.querySelector(
          ".rightbox"
        ) as HTMLParagraphElement;
        const main = document.body.querySelector(
          ".main"
        ) as HTMLParagraphElement;
        const sub = document.body.querySelector(".sub") as HTMLParagraphElement;
        const totalMap = document.body.querySelectorAll(
          ".totalMap"
        ) as NodeListOf<Element>;
        [...totalMap].map((item: any) => {
          if ([...item.classList].includes(String(i))) {
            item.classList.add("mapActive");
          } else {
            item.classList.remove("mapActive");
          }
        });
        if (
          rightScroll &&
          topBox &&
          leftBox &&
          rightBox &&
          image &&
          main &&
          sub
        ) {
          rightScroll.style.transform = `translateY(${i * -262}px)`;
          topBox.style.transform = `translateY(${i * -100}%)`;
          leftBox.style.transform = `translateX(${i * -moveRatio}%)`;
          rightBox.style.transform = `translateX(${
            moveRatio - 100 - moveRatio * -i
          }%)`;
          image.style.transform = `translateY(${i * -100}%)`;
          main.style.transform = `translateY(${i * -100}%)`;
          sub.style.transform = `translateY(${i * -100}%)`;
        }

        // rightScrollRef.current.style.transform = `translateY(${i * -262}px)`;
        // topBoxRef.current.style.transform = `translateY(${i * -100}%)`;
        // leftBoxRef.current.style.transform = `translateX(${i * -moveRatio}%)`;
        // rightBoxRef.current.style.transform = `translateX(${
        //   moveRatio - 100 - moveRatio * -i
        // }%)`;
        // imageRef.current.style.transform = `translateY(${i * -100}%)`;
        // mainRef.current.style.transform = `translateY(${i * -100}%)`;
        // subRef.current.style.transform = `translateY(${i * -100}%)`;

        if (anim) {
          anim.restart();
        }
      };

      gsap.utils.toArray(".lol").forEach((box: any, i) => {
        ScrollTrigger.create({
          trigger: box,
          onEnter: () => goToSection(i),
        });

        ScrollTrigger.create({
          trigger: box,
          start: "bottom bottom",
          onEnterBack: () => goToSection(i),
        });
      });
    }
  }, [loading]);

  return loading === false ? (
    <DRTotalContainer>
      <HiddenPage start={`${start}`} />
      <Nav opac={true} />
      {dummy.map((item: number, i: number) => {
        return <DRContainer key={i} />;
      })}
      <DRContent />
      {modalOpen ? <DRModal handleModalClose={handleModalClose} /> : null}
      <TotalPageMap>
        <TotalPageMapContainer>
          {dummy.map((item: number, i: number) => {
            return <TotalPageMapContent className={`totalMap ${i}`} key={i} />;
          })}
        </TotalPageMapContainer>
      </TotalPageMap>
      <ImageScroll>
        <ImageContainer ref={imageRef} className="image">
          {recipeData.recipe.imageUrls.map((item: string, i: number) => {
            return (
              <ImageContent
                key={i}
                src={`${process.env.REACT_APP_S3_IMG_URL}${item}`}
              ></ImageContent>
            );
          })}
        </ImageContainer>
      </ImageScroll>
      <RightScroll>
        <RightScrollContainer ref={rightScrollRef} className="rightScroll">
          {recipeData.recipe.descriptions.map((item: string, i: number) => {
            return <RightScrollContent key={i}>{item}</RightScrollContent>;
          })}
        </RightScrollContainer>
      </RightScroll>
      <TopBoxScroll>
        <TopBoxContainer ref={topBoxRef} className="topbox">
          {dummy.map((item, i) => {
            return (
              <TopBoxContent
                key={i}
                color={colorMaker(koreaBlue)}
              ></TopBoxContent>
            );
          })}
        </TopBoxContainer>
      </TopBoxScroll>
      <LeftBoxScroll>
        <LeftBoxContainer
          ref={leftBoxRef}
          className="leftbox"
          length={dummy.length}
        >
          {dummy.map((item, i) => {
            return (
              <LeftBoxContent
                key={i}
                color={colorMaker(koreaRed)}
              ></LeftBoxContent>
            );
          })}
        </LeftBoxContainer>
      </LeftBoxScroll>
      <RightBoxScroll>
        <RightBoxContainer
          ref={rightBoxRef}
          className="rightbox"
          length={dummy.length}
        >
          {dummy.map((item, i) => {
            return (
              <RightBoxContent
                key={i}
                color={colorMaker(koreaYellow)}
              ></RightBoxContent>
            );
          })}
        </RightBoxContainer>
      </RightBoxScroll>
      <MainIngredientContainer>
        <MainIngredient ref={mainRef} className="main">
          {dummy.map((item, i) => {
            return (
              <MainIngredientContent key={i}>주재료</MainIngredientContent>
            );
          })}
        </MainIngredient>
      </MainIngredientContainer>
      <SubIngredientContainer>
        <SubIngredient ref={subRef} className="sub">
          {dummy.map((item, i) => {
            return <SubIngredientContent key={i}>부재료</SubIngredientContent>;
          })}
        </SubIngredient>
      </SubIngredientContainer>
      <SudoContainer />
      <CommentButton onClick={handleModalOpen}>댓글 달기</CommentButton>
      <PinkHeadPago
        rotate={rotateMaker()}
        position={positionMaker()}
        end={endPositionMaker()}
        time={pagoTimeMaker()}
        src="/img/PinkHeadPago.png"
      />
      <EggHeadPago
        rotate={rotateMaker()}
        position={positionMaker()}
        end={endPositionMaker()}
        time={pagoTimeMaker()}
        src="/img/eggpago.png"
      />
      <PinkHeadPago
        rotate={rotateMaker()}
        position={positionMaker()}
        end={endPositionMaker()}
        time={pagoTimeMaker()}
        src="/img/PinkHeadPago.png"
      />
      <EggHeadPago
        rotate={rotateMaker()}
        position={positionMaker()}
        end={endPositionMaker()}
        time={pagoTimeMaker()}
        src="/img/eggpago.png"
      />
      <BookMarkIcon
        className="default"
        bookmark={bookmark}
        ref={bookmarkRef}
        onClick={handleBookmark}
      />
    </DRTotalContainer>
  ) : (
    <Loading>loading</Loading>
  );
};

export default DetailRecipe;
