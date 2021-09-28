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
} from "./styles";
import { koreaRed, koreaBlue, koreaYellow } from "koreaTheme";
import { gsap } from "gsap/dist/gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import DRModal from "components/DRModal/DRModal";

const DetailRecipe = () => {
  const rightScrollRef = useRef<any>(null);
  const topBoxRef = useRef<any>(null);
  const leftBoxRef = useRef<any>(null);
  const rightBoxRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const mainRef = useRef<any>(null);
  const subRef = useRef<any>(null);

  const [start, setStart] = useState<boolean>(false);
  const [dummy, setDummy] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [mainIng, setMainIng] = useState<Array<string[]>>([]);

  const colorMaker = (koreaColor: string[]) => {
    const L = koreaColor.length; // 총 길이
    const Random = Math.floor(Math.random() * (L - 1));
    return "#" + koreaColor[Random];
  };

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const handleModalClose = () => {
    setModalOpen(!modalOpen);
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
    console.log(randomPick);

    return positionArr[randomPick];
  };

  const endPositionMaker = () => {
    // 파고 마지막 위치 조절
    return Math.floor(Math.random() * 10);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
    setTimeout(() => {
      setStart(true);
    }, 500);
    const totalLength = document.querySelectorAll(".lol").length;
    const moveRatio = 100 / totalLength;
    const dummyArr: number[] = [];
    for (let i = 0; i < totalLength; i++) {
      dummyArr.push(0);
    }
    setDummy(dummyArr);

    const goToSection = (i: number, anim?: any) => {
      gsap.to(window, {
        scrollTo: { y: i * window.innerHeight, autoKill: false },
        duration: 0.5,
      });

      rightScrollRef.current.style.transform = `translateY(${i * -262}px)`;
      topBoxRef.current.style.transform = `translateY(${i * -100}%)`;
      leftBoxRef.current.style.transform = `translateX(${i * -moveRatio}%)`;
      rightBoxRef.current.style.transform = `translateX(${
        moveRatio - 100 - moveRatio * -i
      }%)`;
      imageRef.current.style.transform = `translateY(${i * -100}%)`;
      mainRef.current.style.transform = `translateY(${i * -100}%)`;
      subRef.current.style.transform = `translateY(${i * -100}%)`;

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

    return () => {};
  }, []);

  // useEffect(() => {}, [dummy]);

  // useEffect(() => {
  //   console.log(mainIng);
  // }, [mainIng]);

  return (
    <DRTotalContainer>
      <HiddenPage start={`${start}`} />
      <Nav opac={true} />
      <DRContainer />
      <DRContainer />
      <DRContainer />
      <DRContainer />
      <DRContent />
      {modalOpen ? <DRModal handleModalClose={handleModalClose} /> : null}
      <ImageScroll>
        <ImageContainer ref={imageRef}>
          {dummy.map((item, i) => {
            return <ImageContent>{i}</ImageContent>;
          })}
        </ImageContainer>
      </ImageScroll>
      <RightScroll>
        <RightScrollContainer ref={rightScrollRef}>
          {dummy.map((item) => {
            return (
              <RightScrollContent>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ratione nemo ipsum impedit dolorum? A sed quae blanditiis
                voluptatibus ad. Animi aliquam modi harum pariatur error rem
                repudiandae quidem perferendis molestiae!
              </RightScrollContent>
            );
          })}
        </RightScrollContainer>
      </RightScroll>
      <TopBoxScroll>
        <TopBoxContainer ref={topBoxRef}>
          {dummy.map((item, i) => {
            return (
              <TopBoxContent color={colorMaker(koreaBlue)}></TopBoxContent>
            );
          })}
        </TopBoxContainer>
      </TopBoxScroll>
      <LeftBoxScroll>
        <LeftBoxContainer ref={leftBoxRef} length={dummy.length}>
          {dummy.map((item, i) => {
            return (
              <LeftBoxContent color={colorMaker(koreaRed)}></LeftBoxContent>
            );
          })}
        </LeftBoxContainer>
      </LeftBoxScroll>
      <RightBoxScroll>
        <RightBoxContainer ref={rightBoxRef} length={dummy.length}>
          {dummy.map((item, i) => {
            return (
              <RightBoxContent
                color={colorMaker(koreaYellow)}
              ></RightBoxContent>
            );
          })}
        </RightBoxContainer>
      </RightBoxScroll>
      <MainIngredientContainer>
        <MainIngredient ref={mainRef}>
          {dummy.map((item) => {
            return <MainIngredientContent>주재료</MainIngredientContent>;
          })}
        </MainIngredient>
      </MainIngredientContainer>
      <SubIngredientContainer>
        <SubIngredient ref={subRef}>
          {dummy.map((item) => {
            return <SubIngredientContent>부재료</SubIngredientContent>;
          })}
        </SubIngredient>
      </SubIngredientContainer>
      <SudoContainer />
      <CommentButton onClick={handleModalOpen}>댓글 달기</CommentButton>
      <PinkHeadPago
        rotate={rotateMaker()}
        position={positionMaker()}
        end={endPositionMaker()}
        src="/img/PinkHeadPago.png"
      />
      <EggHeadPago
        rotate={rotateMaker()}
        position={positionMaker()}
        end={endPositionMaker()}
        src="/img/eggpago.png"
      />
      <PinkHeadPago
        rotate={rotateMaker()}
        position={positionMaker()}
        end={endPositionMaker()}
        src="/img/PinkHeadPago.png"
      />
      <EggHeadPago
        rotate={rotateMaker()}
        position={positionMaker()}
        end={endPositionMaker()}
        src="/img/eggpago.png"
      />
    </DRTotalContainer>
  );
};

export default DetailRecipe;
