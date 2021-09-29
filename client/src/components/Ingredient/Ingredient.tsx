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
  const filterDataArr: any = state.filterData;

  return (
    <>
      <CookerRecipeContainer check={check}>
        {check === "Good"
          ? filterDataArr.length > 0
            ? filterDataArr?.map((item: any) => {
                return (
                  <IngredientDetail
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.imageUrl}
                  />
                );
              })
            : goodDataArr.map((item: any, i: number) => {
                return (
                  <IngredientDetail
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    image={item.imageUrl}
                  />
                );
              })
          : badDataArr.map((item: any, i: number) => {
              return (
                <IngredientDetail
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.imageUrl}
                />
              );
            })}
      </CookerRecipeContainer>
    </>
  );
};

export default Ingredient;
