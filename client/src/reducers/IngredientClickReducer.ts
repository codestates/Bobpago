import { CLEAR_CLICK_DATA, CLICK_DATA } from "actions/IngredientAction";
import { IngredientClickData } from "types";

interface Action {
  type: string;
  payload: any;
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
      if (
        state.clickData.filter((item) => item.id === action.payload.id)
          .length >= 1
      ) {
        state.clickData = state.clickData.filter(
          (item) => item.id !== action.payload.id
        );
      } else if (
        state.clickData.filter((item) => item.id === action.payload.id)
          .length === 0
      ) {
        state.clickData.push(action.payload);
      }
      return {
        ...state,
      };
    case CLEAR_CLICK_DATA:
      state.clickData = [];
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
