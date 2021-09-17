import React, { useState } from "react";
import {
  ContainerWrapper,
  TitleSlide,
  RecipeTimeSlide,
  IngredientSlide,
  DescriptionSlide,
  NextButton,
  PrevButton,
  CompleteButton,
} from "./styled";

const WriteRecipe = () => {
  const [page, setPage] = useState<number>(0);
  console.log(page);
  return (
    <ContainerWrapper page={page}>
      <TitleSlide />
      <RecipeTimeSlide />
      <IngredientSlide />
      <DescriptionSlide />
      <NextButton onClick={() => setPage(page + 1)}>Next</NextButton>
      <PrevButton onClick={() => setPage(page - 1)}>Prev</PrevButton>
      <CompleteButton>Complete</CompleteButton>
    </ContainerWrapper>
  );
};

export default WriteRecipe;
