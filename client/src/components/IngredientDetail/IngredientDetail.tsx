import React, { useState } from "react";
import { BadCookerRecipe } from "./styles";

const IngredientDetail = ({ name, image }: { name: string; image: string }) => {
  const [light, setLight] = useState<boolean>(false); // 버튼 누를시 불켜짐

  const handleClick = (): void => {
    setLight(!light);
  };

  return (
    <BadCookerRecipe onClick={handleClick} light={light}>
      <h1>{name}</h1>
      <img src={image} alt="" />
    </BadCookerRecipe>
  );
};

export default IngredientDetail;
