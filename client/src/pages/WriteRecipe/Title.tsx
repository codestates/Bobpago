import React, { useState } from "react";
import { TitleSlide, RecipeTitle, TitleInput } from "./styles";

const Title = ({ page, scale }: any) => {
  const [recipeTitle, setRecipeTitle] = useState<string>("");
  return (
    <TitleSlide page={page} scale={scale}>
      <RecipeTitle>어떤 요리를 만드실 건가요?</RecipeTitle>
      <TitleInput
        value={recipeTitle}
        onChange={(e) => setRecipeTitle(e.target.value)}
        placeholder="→  레시피의 제목을 입력해주세요"
      />
    </TitleSlide>
  );
};

export default Title;
