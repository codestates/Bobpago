import {
  GO_TO_NEXT_PAGE,
  GO_TO_PREV_PAGE,
  RESET_WRITE_PAGE,
} from "actions/WriteRecipePage";
import { WriteRecipePage } from "../types";

const initialState: WriteRecipePage = {
  currentPage: 0,
};

interface Action {
  type: string;
}

const WriteRecipePageReducer = (
  state: WriteRecipePage = initialState,
  action: Action
) => {
  switch (action.type) {
    case GO_TO_NEXT_PAGE:
      return {
        currentPage: state.currentPage + 1,
      };
    case GO_TO_PREV_PAGE:
      return {
        currentPage: state.currentPage - 1,
      };
    case RESET_WRITE_PAGE:
      return {
        currentPage: 0,
      };
    default:
      return state;
  }
};

export default WriteRecipePageReducer;
