import { combineReducers } from "redux";
import SignUpAndSignInReducer from "./SignUpAndSignInReducer";
import IngredientReducer from "./IngredientReducer";

const rootReducer = combineReducers({
  SignUpAndSignInReducer,
  IngredientReducer,
});

export default rootReducer;
