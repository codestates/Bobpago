import React, { useState, useEffect, useRef } from "react";
import SearchBar from "components/SearchBar/SearchBar";
import Book from "components/Book/Book";
import Nav from "components/Nav/Nav";
import Title from "./TitleEdit";
import Time from "./TimeEdit";
import Ingredient from "./IngredientEdit";
import Description from "./DescriptionEdit";
import Circle1 from "components/MovingCircle/WriteRecipe/WriteRecipeCircle1";
import Circle2 from "components/MovingCircle/WriteRecipe/WriteRecipeCircle2";
import { ContainerWrapper } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { goToNextPageEdit, goToPrevPageEdit } from "actions/EditRecipePage";
import {
  editTitle,
  editTime,
  editDescription,
  editDifficulty,
  editIngredient,
  editServing,
  editImage,
} from "actions/EditRecipeContents";

const EditRecipe = () => {
  const [circle1IsHover, setCircle1IsHover] = useState<boolean>(false);
  const [circle2IsHover, setCircle2IsHover] = useState<boolean>(false);
  const dispatch = useDispatch();
  const page = useSelector(
    (state: RootState) => state.EditRecipePageReducer.currentPage
  );
  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    page < 0 && dispatch(goToNextPageEdit());
    page > 3 && dispatch(goToPrevPageEdit());
    setTimeout(() => setScale(page), 700);
  }, [page]);

  useEffect(() => {
    dispatch(editTitle(String(Math.random())));
    dispatch(editDifficulty(2));
    dispatch(editIngredient([2, 4, 5]));
    dispatch(editServing(2));
    dispatch(editTime(10));
    dispatch(editDescription(["adsf", "bbbb", "cccc", "dddd"]));
  }, []);

  return (
    <>
      <Nav opac={false} />
      <ContainerWrapper>
        <Title
          setCircle1IsHover={setCircle1IsHover}
          setCircle2IsHover={setCircle2IsHover}
          page={page}
          scale={scale}
        />
        <Time
          setCircle1IsHover={setCircle1IsHover}
          setCircle2IsHover={setCircle2IsHover}
          page={page - 1}
          scale={scale - 1}
        />
        <Ingredient
          setCircle1IsHover={setCircle1IsHover}
          setCircle2IsHover={setCircle2IsHover}
          page={page - 2}
          scale={scale - 2}
        />
        <Description
          setCircle1IsHover={setCircle1IsHover}
          setCircle2IsHover={setCircle2IsHover}
          page={page - 3}
          scale={scale - 3}
        />
        <Circle1 circle1IsHover={circle1IsHover} />
        <Circle2 circle2IsHover={circle2IsHover} />
      </ContainerWrapper>
    </>
  );
};

export default EditRecipe;
