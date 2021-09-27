import React, { useState, useEffect, useRef } from "react";
import SearchBar from "components/SearchBar/SearchBar";
import Book from "components/Book/Book";
import Nav from "components/Nav/Nav";
import Title from "./Title";
import Time from "./Time";
import Ingredient from "./Ingredient";
import Circle1 from "components/MovingCircle/Circle1";
import Circle2 from "components/MovingCircle/Circle2";
import {
  ContainerWrapper,
  DescriptionSlide,
  NextButton,
  PrevButton,
  CompleteButton,
} from "./styles";

const WriteRecipe = () => {
  const [page, setPage] = useState<number>(0);
  const [scale, setScale] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const theOtherTimeRef = useRef<any>(null);

  useEffect(() => {
    page < 0 && setPage(0);
    page > 3 && setPage(3);
    setTimeout(() => setScale(page), 700);
  }, [page]);

  return (
    <>
      {/* <Nav /> */}
      <ContainerWrapper>
        <Title page={page} scale={scale} />
        <Time page={page - 1} scale={scale - 1} />
        <Ingredient page={page - 2} scale={scale - 2} />
        <DescriptionSlide page={page - 3} scale={scale - 3}>
          <Book />
        </DescriptionSlide>
        <NextButton page={page} onClick={() => setPage(page + 1)}>
          Next
        </NextButton>
        <PrevButton page={page} onClick={() => setPage(page - 1)}>
          Prev
        </PrevButton>
        <CompleteButton page={page}>Complete</CompleteButton>
        <Circle1 />
        <Circle2 />
      </ContainerWrapper>
    </>
  );
};

export default WriteRecipe;
