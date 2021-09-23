import { combineReducers } from "redux";
import SignUpAndSignInReducer from "./SignUpAndSignInReducer";
import WriteRecipePageReducer from "./WriteRecipePageReducer";
import WriteRecipeContentsReducer from "./WriteRecipeContentsReducer";
import {
  SignUpSignInSlide,
  WriteRecipePage,
  WriteRecipeContent,
} from "../types";

export interface RootState {
  SignUpAndSignInReducer: SignUpSignInSlide;
  WriteRecipePageReducer: WriteRecipePage;
  WriteRecipeContentsReducer: WriteRecipeContent;
}

const rootReducer = combineReducers({
  SignUpAndSignInReducer,
  WriteRecipePageReducer,
  WriteRecipeContentsReducer,
});

export default rootReducer;
