import { combineReducers } from "redux";
import SignUpAndSignInReducer from "./SignUpAndSignInReducer";
import IngredientReducer from "./IngredientReducer";
import WriteRecipePageReducer from "./WriteRecipePageReducer";
import WriteRecipeContentsReducer from "./WriteRecipeContentsReducer";
import EditRecipePageReducer from "./EditRecipePageReducer";
import EditRecipeContentsReducer from "./EditRecipeContentsReducer";
import NotificationReducer from "./NotificationReducer";
import IngredientClickReducer from "./IngredientClickReducer";
import AccesstokenReducer from "./AccesstokenReducer";
import MatchingReducer from "./Matching";
import DetailRecipeReducer from "./DetailRecipeReducer";

import {
  SignUpSignInSlide,
  WriteRecipePage,
  WriteRecipeContent,
  Notification,
  IngredientGoodAndBadData,
  IngredientClickData,
  Accesstoken,
  MatchRecipe,
  DetailRecipe,
} from "../types";

export interface RootState {
  SignUpAndSignInReducer: SignUpSignInSlide;
  IngredientReducer: IngredientGoodAndBadData;
  WriteRecipePageReducer: WriteRecipePage;
  WriteRecipeContentsReducer: WriteRecipeContent;
  NotificationReducer: Notification;
  EditRecipePageReducer: WriteRecipePage;
  EditRecipeContentsReducer: WriteRecipeContent;
  IngredientClickReducer: IngredientClickData;
  AccesstokenReducer: Accesstoken;
  MatchingReducer: MatchRecipe;
  DetailRecipeReducer: DetailRecipe;
}

const rootReducer = combineReducers({
  SignUpAndSignInReducer,
  IngredientReducer,
  WriteRecipePageReducer,
  WriteRecipeContentsReducer,
  NotificationReducer,
  EditRecipePageReducer,
  EditRecipeContentsReducer,
  IngredientClickReducer,
  AccesstokenReducer,
  MatchingReducer,
  DetailRecipeReducer,
});

export default rootReducer;
