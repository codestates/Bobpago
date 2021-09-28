import { CLICK_DATA } from "actions/IngredientAction";
import { IngredientClickData } from "types";

interface Action {
  type: string;
  payload: number;
}

const initailState: IngredientClickData = {
  clickData: [],
};

const IngredientClickReducer = (
  state: IngredientClickData = initailState,
  action: Action
) => {
  switch (action.type) {
    case CLICK_DATA:
      if (state.clickData.includes(action.payload)) {
        state.clickData = state.clickData.filter(
          (item) => item !== action.payload
        );
      } else if (!state.clickData.includes(action.payload)) {
        state.clickData.push(action.payload);
      }
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default IngredientClickReducer;
