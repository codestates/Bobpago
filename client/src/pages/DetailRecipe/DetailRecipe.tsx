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
} from "./styles";
import { koreaRed, koreaBlue, koreaYellow } from "koreaTheme";
import { gsap } from "gsap/dist/gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import DRModal from "components/DRModal/DRModal";

const DetailRecipe = () => {
  let dummyMainIngredient: string[] = ["양파", "계란", "파"];

  const rightScrollRef = useRef<any>(null);
  const topBoxRef = useRef<any>(null);
  const leftBoxRef = useRef<any>(null);
  const rightBoxRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const mainRef = useRef<any>(null);

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

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
    setTimeout(() => {
      setStart(true);
    }, 500);
  }, []);

  useEffect(() => {
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

      rightScrollRef.current.style.transform = `translateY(${i * -300}px)`;
      topBoxRef.current.style.transform = `translateY(${i * -100}%)`;
      leftBoxRef.current.style.transform = `translateX(${i * -moveRatio}%)`;
      rightBoxRef.current.style.transform = `translateX(${
        moveRatio - 100 - moveRatio * -i
      }%)`;
      imageRef.current.style.transform = `translateY(${i * -100}%)`;
      mainRef.current.style.transform = `translateY(${i * -100}%)`;

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

  useEffect(() => {
    if (dummy.length !== 0) {
      const divide: number = dummyMainIngredient.length / dummy.length;
      const newArr: Array<string[]> = [];
      while (dummyMainIngredient.length > 0) {
        if (divide >= 1 && divide % 1 === 0) {
          const arr = dummyMainIngredient.splice(0, divide);
          newArr.push(arr);
        } else if (divide >= 1 && divide < 2) {
          if (dummyMainIngredient.length < divide * 2) {
            const arr = dummyMainIngredient.splice(0, 1);
            newArr.push(arr);
          } else {
            const arr = dummyMainIngredient.splice(0, Math.ceil(divide));
            newArr.push(arr);
          }
        } else if (divide >= 1 && divide % 1 !== 0) {
          if (dummyMainIngredient.length < Math.floor(divide) * 2) {
            const arr = dummyMainIngredient.splice(0);
            newArr.push(arr);
          } else {
            const arr = dummyMainIngredient.splice(0, Math.floor(divide));
            newArr.push(arr);
          }
        } else if (divide < 1) {
          const arr = dummyMainIngredient.splice(0, 1);
          newArr.push(arr);
        }
      }
      setMainIng(newArr);
    }
  }, [dummy]);

  useEffect(() => {
    console.log(mainIng);
  }, [mainIng]);

  return (
    <DRTotalContainer>
      <HiddenPage start={`${start}`} />
      <Nav opac={true} />
      <DRContainer />
      <DRContainer />
      <DRContainer />
      <DRContainer />
      <DRContent handleModalOpen={handleModalOpen} />
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
            return <TopBoxContent color={colorMaker(koreaRed)}></TopBoxContent>;
          })}
        </TopBoxContainer>
      </TopBoxScroll>
      <LeftBoxScroll>
        <LeftBoxContainer ref={leftBoxRef} length={dummy.length}>
          {dummy.map((item, i) => {
            return (
              <LeftBoxContent color={colorMaker(koreaBlue)}></LeftBoxContent>
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
          {mainIng.map((item) => {
            console.log(item);

            return <MainIngredientContent>{item}</MainIngredientContent>;
          })}
        </MainIngredient>
      </MainIngredientContainer>
      <SubIngredient></SubIngredient>
    </DRTotalContainer>
  );
};

export default DetailRecipe;
