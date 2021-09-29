import { SET_RECIPE } from "actions/Matching";
import { MatchRecipe } from "types";

interface Action {
  type: string;
  payload: any;
}

const initialState: MatchRecipe = {
  data: [],
};

const MatchingReducer = (state: MatchRecipe = initialState, action: Action) => {
  switch (action.type) {
    case SET_RECIPE:
      state.data = action.payload.slice();
      return state.data;
    default:
      return {
        ...state.data,
      };
  }
};

export default MatchingReducer;
