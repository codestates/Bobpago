import {
  GET_ALL_DATA,
  GET_FILTER_DATA,
  GET_SMALL_DATA,
} from "actions/IngredientAction";
import { IngredientGoodAndBadData } from "types";

interface Action {
  type: string;
  payload: any;
}

const initialState: IngredientGoodAndBadData = {
  badData: [],
  goodData: [],
  filterData: [],
};

const IngredientReducer = (
  state: IngredientGoodAndBadData = initialState,
  action: Action
) => {
  switch (action.type) {
    case GET_FILTER_DATA:
      state.filterData = state.goodData.filter((item) =>
        item.name.includes(action.payload)
      );
      return {
        ...state,
      };
    case GET_SMALL_DATA:
      state.badData = action.payload;
      return {
        ...state,
      };
    case GET_ALL_DATA:
      state.goodData = action.payload;
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default IngredientReducer;
