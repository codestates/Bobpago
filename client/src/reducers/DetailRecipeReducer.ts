import { SET_DETAIL_DATA } from "../actions/DetailRecipe";
import { DetailRecipe } from "../types";

const initialState: DetailRecipe = {
  user: { id: 0, nickname: "" },
  recipe: [],
  ingredients: [],
};

interface Action {
  type: string;
  payload?: any;
}

const DetailRecipeReducer = (
  state: DetailRecipe = initialState,
  action: Action
) => {
  switch (action.type) {
    case SET_DETAIL_DATA:
      return Object.assign({}, state, {
        user: action.payload.user,
        recipe: action.payload.recipe,
        ingredients: action.payload.ingredients,
      });
    default:
      return { ...state };
  }
};

export default DetailRecipeReducer;
