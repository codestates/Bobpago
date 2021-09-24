import {
  SET_TITLE,
  SET_TIME,
  SET_INGREDIENT,
  SET_DESCRIPTION,
  SET_IMAGE,
  RESET_ALL_CONTENTS,
} from "actions/WriteRecipeContents";
import { WriteRecipeContent } from "../types";

const initialState: WriteRecipeContent = {
  title: "",
  ingredient: [],
  time: null,
  description: [""],
  image: [""],
};

interface Action {
  type: string;
  payload: any;
}

const WriteRecipeContentsReducer = (
  state: WriteRecipeContent = initialState,
  action: Action
) => {
  switch (action.type) {
    case SET_TITLE:
      return Object.assign({}, state, {
        title: action.payload.title,
      });
    case SET_TIME:
      return Object.assign({}, state, {
        ingredient: action.payload.time,
      });
    case SET_INGREDIENT:
      return Object.assign({}, state, {
        time: action.payload.ingredient,
      });
    case SET_DESCRIPTION:
      return Object.assign({}, state, {
        description: action.payload.description,
      });
    case SET_IMAGE:
      return Object.assign({}, state, {
        image: action.payload.image,
      });
    case RESET_ALL_CONTENTS:
      return initialState;
    default:
      return state;
  }
};

export default WriteRecipeContentsReducer;
