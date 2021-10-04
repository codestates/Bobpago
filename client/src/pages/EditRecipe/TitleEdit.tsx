import React, { useState, useEffect } from "react";
import useHover from "utils/useHover";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { goToNextPageEdit, goToPrevPageEdit } from "actions/EditRecipePage";
import { notify } from "actions/Notification";
import { editTitle } from "actions/EditRecipeContents";
import {
  TitleSlide,
  RecipeTitle,
  TitleInput,
  NextButton,
  PrevButton,
} from "./styles";

const Title = ({ page, scale, setCircle1IsHover, setCircle2IsHover }: any) => {
  const dispatch = useDispatch();
  const [recipeTitle, setRecipeTitle] = useState<string>("");
  const [circle1, circle1IsHover] = useHover();
  const [circle2, circle2IsHover] = useHover();
  const title = useSelector(
    (state: RootState) => state.EditRecipeContentsReducer.title
  );

  useEffect(() => {
    setRecipeTitle(title);
  }, [title]);

  const handleStoreTitle = () => {
    if (!recipeTitle) {
      dispatch(notify("제목을 입력해주세요"));
      return;
    }
    dispatch(editTitle(recipeTitle));
    dispatch(goToNextPageEdit());
  };

  useEffect(() => {
    if (circle2IsHover) setCircle2IsHover(true);
    else setCircle2IsHover(false);
  }, [circle2IsHover]);

  useEffect(() => {
    if (circle1IsHover) setCircle1IsHover(true);
    else setCircle1IsHover(false);
  }, [circle1IsHover]);

  return (
    <>
      <TitleSlide page={page} scale={scale}>
        <RecipeTitle>어떤 요리를 만드실 건가요?</RecipeTitle>
        <TitleInput
          value={recipeTitle}
          onChange={(e) => setRecipeTitle(e.target.value)}
          placeholder="→  레시피의 제목을 입력해주세요"
        />
      </TitleSlide>
      <NextButton ref={circle2} page={page} onClick={() => handleStoreTitle()}>
        Next
      </NextButton>
      <PrevButton
        ref={circle1}
        page={page}
        onClick={() => dispatch(goToPrevPageEdit())}
      >
        Prev
      </PrevButton>
    </>
  );
};

export default Title;
