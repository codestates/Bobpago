import { combineReducers } from "redux";
import SignUpAndSignInReducer from "./SignUpAndSignInReducer";
import IngredientReducer from "./IngredientReducer";
import WriteRecipePageReducer from "./WriteRecipePageReducer";
import WriteRecipeContentsReducer from "./WriteRecipeContentsReducer";
import {
  SignUpSignInSlide,
  WriteRecipePage,
  WriteRecipeContent,
  IngredientGoodAndBadData,
} from "../types";

export interface RootState {
  SignUpAndSignInReducer: SignUpSignInSlide;
  IngredientReducer: IngredientGoodAndBadData;
  WriteRecipePageReducer: WriteRecipePage;
  WriteRecipeContentsReducer: WriteRecipeContent;
}

const rootReducer = combineReducers({
  SignUpAndSignInReducer,
  IngredientReducer,
  WriteRecipePageReducer,
  WriteRecipeContentsReducer,
});

export default rootReducer;
