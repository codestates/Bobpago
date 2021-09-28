import React, { useState } from "react";
import { BadCookerRecipe } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { CLICK_DATA } from "actions/IngredientAction";

const IngredientDetail = ({
  id,
  name,
  image,
}: {
  id: number;
  name: string;
  image: string;
}) => {
  const [light, setLight] = useState<boolean>(false); // 버튼 누를시 불켜짐
  const clickState = useSelector(
    (state: RootState) => state.IngredientClickReducer
  );
  const dispatch = useDispatch();

  const handleClick = (): void => {
    setLight(!light);
    dispatch({ type: CLICK_DATA, payload: id });
    console.log(clickState);
  };

  return (
    <BadCookerRecipe onClick={handleClick} light={light}>
      <h1>{name}</h1>
      <img src={image} alt="" />
    </BadCookerRecipe>
  );
};

export default IngredientDetail;
