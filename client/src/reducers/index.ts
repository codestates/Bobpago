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
<<<<<<< HEAD
  Notification,
=======
  IngredientGoodAndBadData,
>>>>>>> b7d2ae8ef2bc07d12939976d56decb5f64b5ca43
} from "../types";

export interface RootState {
  SignUpAndSignInReducer: SignUpSignInSlide;
  IngredientReducer: IngredientGoodAndBadData;
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
