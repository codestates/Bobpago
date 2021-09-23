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
} from "./styles";
import { gsap } from "gsap/dist/gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import DRModal from "components/DRModal/DRModal";

const DetailRecipe = () => {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  const rightScrollRef = useRef<any>(null);
  const topBoxRef = useRef<any>(null);
  const leftBoxRef = useRef<any>(null);
  const rightBoxRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const [dummy, setDummy] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const colorMaker = () => {
    const color: string[] = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    const colorPicker: string[] = [];
    const colorLength: number = color.length;

    for (let i = 0; i < 6; i++) {
      const eachColor = color[Math.floor(Math.random() * (colorLength - 1))];
      colorPicker.push(eachColor);
    }
    return "#" + colorPicker.join("");
  };

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const handleModalClose = () => {
    setModalOpen(!modalOpen);
  };

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

  useEffect(() => {}, [dummy]);

  return (
    <DRTotalContainer>
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
            return <TopBoxContent color={colorMaker()}>{i}</TopBoxContent>;
          })}
        </TopBoxContainer>
      </TopBoxScroll>
      <LeftBoxScroll>
        <LeftBoxContainer ref={leftBoxRef} length={dummy.length}>
          {dummy.map((item, i) => {
            return <LeftBoxContent color={colorMaker()}>{i}</LeftBoxContent>;
          })}
        </LeftBoxContainer>
      </LeftBoxScroll>
      <RightBoxScroll>
        <RightBoxContainer ref={rightBoxRef} length={dummy.length}>
          {dummy.map((item, i) => {
            return <RightBoxContent color={colorMaker()}>{i}</RightBoxContent>;
          })}
        </RightBoxContainer>
      </RightBoxScroll>
    </DRTotalContainer>
  );
};

export default DetailRecipe;
