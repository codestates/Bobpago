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
  ViewContainer,
  ViewIcon,
  LikeFillIcon,
  LikeIcon,
  EditIcon,
  ReactionCount,
  NotifiToast,
  NotifiMainContainer,
  NotifiSubContainer,
  NotifiMainTitle,
  NotifiMainIngredient,
  NotifiSubTitle,
  NotifiSubIngredient,
} from "./styles";
import { koreaRed, koreaBlue, koreaYellow, headPago } from "koreaTheme";
import { gsap } from "gsap/dist/gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLocation, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import DRModal from "components/DRModal/DRModal";
import { showSignIn } from "actions/SignUpAndSignIn";
import axios from "axios";
import { SET_DETAIL_DATA } from "actions/DetailRecipe";
import CheckExpired from "utils/CheckExpired";
import { reissueAccessToken } from "actions/Accesstoken";

const DetailRecipe = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const locationProps = location.state;
  const loginState = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );

  const [start, setStart] = useState<boolean>(false);
  const [dummy, setDummy] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [recipeData, setRecipeData] = useState<any>(null);
  const [totalLength, setTotalLength] = useState<number>(0);

  const bookmarkRef = useRef<any>(null);
  const countRef = useRef<any>(null);
  const notifyRef = useRef<any>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const goToSection = (i: number, anim?: any) => {
    gsap.to(window, {
      scrollTo: { y: i * window.innerHeight, autoKill: false },
      duration: 0.5,
    });
    const moveRatio = 100 / totalLength;
    const image = document.body.querySelector(".image") as HTMLParagraphElement;
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
    const main = document.body.querySelector(".main") as HTMLParagraphElement;
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
    if (rightScroll && topBox && leftBox && rightBox && image && main && sub) {
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

    if (anim) {
      anim.restart();
    }
  };

  const handleBookmark = async () => {
    // const bookmarkState = [...bookmarkRef.current.classList].includes("active");
    if (loginState.accessToken === "") {
      dispatch(showSignIn());
      return;
    }
    if (loginState.accessToken) {
      const newToken = await CheckExpired(
        loginState.accessToken,
        loginState.tokenType,
        loginState.userId
      );
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      if (!bookmark) {
        const data = await axios.post(
          `${serverUrl}/${locationProps}/bookmarks?tokenType=${loginState.tokenType}`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${loginState.accessToken}`,
            },
          }
        );
        console.log(data);
        setBookmark(true);
        bookmarkRef.current.classList.add("active");
      } else {
        const data = await axios.delete(
          `${serverUrl}/${locationProps}/bookmarks?tokenType=${loginState.tokenType}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${loginState.accessToken}`,
            },
          }
        );
        console.log(data);
        setBookmark(false);
        bookmarkRef.current.classList.remove("active");
      }
    } catch (err) {
      console.log(err);
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
    const data = await axios.get(`${serverUrl}/recipe/${locationProps}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const descriptions = data.data.data.recipe.descriptions;
    let dummyData: number[] = [];
    for (let i = 0; i < descriptions.length; i++) {
      dummyData.push(descriptions[i]);
    }

    const totalArrLength = data.data.data.recipe.descriptions;
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    setRecipeData(data.data.data);

    setDummy(dummyData);
    setTotalLength(totalArrLength.length);
  };

  const handleMypageData = async () => {
    const data = await axios.get(
      `${serverUrl}/me?tokenType=${loginState.tokenType}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${loginState.accessToken}`,
        },
      }
    );

    const BookmarkArr = data.data.data.bookmarks;
    const isBookmarked =
      BookmarkArr.filter((item: { id: number }) => {
        return item.id === locationProps;
      }).length === 1;

    if (isBookmarked) {
      setBookmark(true);
    } else {
    }
  };

  useEffect(() => {
    handlePageData();
    if (loginState.tokenType !== "") {
      // 마이페이지 정보 호출
      handleMypageData();
    }
  }, []);

  useEffect(() => {
    if (recipeData !== null) {
      setTotalLength(recipeData.recipe.descriptions.length);
      setLoading(false);
      return () => {};
    }
  }, [recipeData]);

  useEffect(() => {
    const render = document.querySelectorAll(".lol");
    if (loading === false && render.length > 0) {
      dispatch({ type: SET_DETAIL_DATA, payload: recipeData });

      gsap.utils.toArray(".lol").forEach((box: any, i) => {
        ScrollTrigger.create({
          trigger: box,
          onEnter: () => goToSection(i),
        });

        ScrollTrigger.create({
          trigger: box,
          start: "bottom bottom",
          end: "bottom 5%+=20px",
          onEnterBack: () => goToSection(i),
        });
      });
    }
  });

  useEffect(() => {
    setStart(true);
  }, [goToSection]);

  const handleReaction = async () => {
    try {
      if (loginState.accessToken) {
        const newToken = await CheckExpired(
          loginState.accessToken,
          loginState.tokenType,
          loginState.userId
        );
        if (newToken) {
          dispatch(reissueAccessToken(newToken));
        }
      }

      if (recipeData.recipe.recipe_reaction_state === 0) {
        recipeData.recipe.recipe_reaction_state = 1;
        countRef.current.textContent++;
      } else {
        recipeData.recipe.recipe_reaction_state = 0;
        countRef.current.textContent--;
      }

      const nextReaction = recipeData.recipe.recipe_reaction_state;

      const data = await axios.post(
        `${serverUrl}/recipe/${locationProps}?reaction=${nextReaction}&tokenType=${loginState.tokenType}`,
        {},
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${loginState.accessToken}`,
          },
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditRecipe = () => {
    history.push({
      pathname: `/editrecipe/${locationProps}`,
      state: locationProps,
    });
  };

  const handlePagoHead = () => {
    const N = Math.floor(Math.random() * headPago.length);
    return headPago[N];
  };

  const handleNotification = () => {
    notifyRef.current.style.bottom = "5%";
    setTimeout(() => {
      notifyRef.current.style.bottom = "-20%";
    }, 5000);
  };

  return loading === false ? (
    <DRTotalContainer>
      <HiddenPage start={`${start}`} />
      <Nav opac={true} />
      {dummy.map((item: number, i: number) => {
        return <DRContainer key={i} />;
      })}
      <DRContent />
      {modalOpen ? (
        <DRModal recipeId={locationProps} handleModalClose={handleModalClose} />
      ) : null}
      <TotalPageMap className="totalMap">
        <TotalPageMapContainer>
          {dummy.map((item: number, i: number) => {
            return <TotalPageMapContent className={`totalMap ${i}`} key={i} />;
          })}
        </TotalPageMapContainer>
      </TotalPageMap>
      <ImageScroll>
        <ImageContainer className="image">
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
        <RightScrollContainer className="rightScroll">
          {recipeData.recipe.descriptions.map((item: string, i: number) => {
            return <RightScrollContent key={i}>{item}</RightScrollContent>;
          })}
        </RightScrollContainer>
      </RightScroll>
      <TopBoxScroll>
        <TopBoxContainer className="topbox">
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
        <LeftBoxContainer className="leftbox" length={dummy.length}>
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
        <RightBoxContainer className="rightbox" length={dummy.length}>
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
        <MainIngredient className="main">
          {dummy.map((item, i) => {
            return (
              <MainIngredientContent key={i}>
                <img src={handlePagoHead()} alt="" />
              </MainIngredientContent>
            );
          })}
        </MainIngredient>
      </MainIngredientContainer>
      <SubIngredientContainer>
        <SubIngredient onClick={handleNotification} className="sub">
          {dummy.map((item, i) => {
            return (
              <SubIngredientContent key={i}>재료 보기</SubIngredientContent>
            );
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
        src={handlePagoHead()}
      />
      <EggHeadPago
        rotate={rotateMaker()}
        position={positionMaker()}
        end={endPositionMaker()}
        time={pagoTimeMaker()}
        src={handlePagoHead()}
      />
      <PinkHeadPago
        rotate={rotateMaker()}
        position={positionMaker()}
        end={endPositionMaker()}
        time={pagoTimeMaker()}
        src={handlePagoHead()}
      />
      <EggHeadPago
        rotate={rotateMaker()}
        position={positionMaker()}
        end={endPositionMaker()}
        time={pagoTimeMaker()}
        src={handlePagoHead()}
      />
      <BookMarkIcon
        className="default"
        bookmark={bookmark}
        ref={bookmarkRef}
        onClick={handleBookmark}
      />
      {recipeData.user.id === loginState.userId && (
        <EditIcon onClick={() => handleEditRecipe()} />
      )}
      <ViewContainer>
        <ViewIcon />
        {recipeData.recipe.views}
        {recipeData.recipe.recipe_reaction_state === 1 ? (
          <LikeFillIcon onClick={() => handleReaction()} />
        ) : (
          <LikeFillIcon onClick={() => handleReaction()} />
        )}
        <ReactionCount ref={countRef}>
          {recipeData.recipe.recipe_reaciton_count}
        </ReactionCount>
      </ViewContainer>
      <NotifiToast ref={notifyRef}>
        <NotifiMainContainer>
          <NotifiMainTitle>주재료 : </NotifiMainTitle>
          <NotifiMainIngredient>
            {recipeData.ingredients.main.map((item: any) => {
              return <span>{item.name}</span>;
            })}
          </NotifiMainIngredient>
        </NotifiMainContainer>
        <NotifiSubContainer>
          <NotifiSubTitle>부재료 : </NotifiSubTitle>
          <NotifiSubIngredient>
            {recipeData.ingredients.sub.map((item: any) => {
              return <span>{item.name}</span>;
            })}
          </NotifiSubIngredient>
        </NotifiSubContainer>
      </NotifiToast>
    </DRTotalContainer>
  ) : (
    <Loading>loading</Loading>
  );
};

export default DetailRecipe;
