import {
  GO_TO_NEXT_PAGE_EDIT,
  GO_TO_PREV_PAGE_EDIT,
  RESET_EDIT_PAGE,
} from "actions/EditRecipePage";
import { WriteRecipePage } from "../types";

const initialState: WriteRecipePage = {
  currentPage: 0,
};

interface Action {
  type: string;
}

const EditRecipePageReducer = (
  state: WriteRecipePage = initialState,
  action: Action
) => {
  switch (action.type) {
    case GO_TO_NEXT_PAGE_EDIT:
      return {
        currentPage: state.currentPage + 1,
      };
    case GO_TO_PREV_PAGE_EDIT:
      return {
        currentPage: state.currentPage - 1,
      };
    case RESET_EDIT_PAGE:
      return {
        currentPage: 0,
      };
    default:
      return state;
  }
};

export default EditRecipePageReducer;
