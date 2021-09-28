import { getFilterData } from "actions/IngredientAction";
import IngredientDetail from "components/IngredientDetail/IngredientDetail";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { CookerRecipeContainer } from "./styles";

const Ingredient = ({ check }: { check: string }) => {
  const state = useSelector((state: RootState) => state.IngredientReducer);

  const goodDataArr = state.goodData;
  const badDataArr = state.badData;

  return (
    <>
      <CookerRecipeContainer check={check}>
        {check === "Good"
          ? goodDataArr.map((item: any, i: number) => {
              return (
                <IngredientDetail
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                />
              );
            })
          : badDataArr.map((item: any, i: number) => {
              return (
                <IngredientDetail
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                />
              );
            })}
      </CookerRecipeContainer>
    </>
  );
};

export default Ingredient;
