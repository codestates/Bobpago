import { combineReducers } from "redux";
import SignUpAndSignInReducer from "./SignUpAndSignInReducer";
import IngredientReducer from "./IngredientReducer";
import WriteRecipePageReducer from "./WriteRecipePageReducer";
import WriteRecipeContentsReducer from "./WriteRecipeContentsReducer";
import EditRecipePageReducer from "./EditRecipePageReducer";
import EditRecipeContentsReducer from "./EditRecipeContentsReducer";
import NotificationReducer from "./NotificationReducer";
import {
  SignUpSignInSlide,
  WriteRecipePage,
  WriteRecipeContent,
  Notification,
} from "../types";

export interface RootState {
  SignUpAndSignInReducer: SignUpSignInSlide;
  WriteRecipePageReducer: WriteRecipePage;
  WriteRecipeContentsReducer: WriteRecipeContent;
  NotificationReducer: Notification;
  EditRecipePageReducer: WriteRecipePage;
  EditRecipeContentsReducer: WriteRecipeContent;
}

const rootReducer = combineReducers({
  SignUpAndSignInReducer,
  IngredientReducer,
  WriteRecipePageReducer,
  WriteRecipeContentsReducer,
  NotificationReducer,
  EditRecipePageReducer,
  EditRecipeContentsReducer,
});

export default rootReducer;
