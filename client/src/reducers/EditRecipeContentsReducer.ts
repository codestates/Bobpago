import {
  EDIT_TITLE,
  EDIT_TIME,
  EDIT_INGREDIENT,
  EDIT_DESCRIPTION,
  EDIT_IMAGE,
  EDIT_DIFIICULTY,
  EDIT_SERVING,
  REEDIT_ALL_CONTENTS,
} from "actions/EditRecipeContents";
import { WriteRecipeContent } from "../types";

const initialState: WriteRecipeContent = {
  title: "",
  ingredient: [],
  time: 10,
  description: [""],
  image: [""],
  difficulty: 1,
  serving: 0,
};

interface Action {
  type: string;
  payload: any;
}

const EditRecipeContentsReducer = (
  state: WriteRecipeContent = initialState,
  action: Action
) => {
  switch (action.type) {
    case EDIT_TITLE:
      return Object.assign({}, state, {
        title: action.payload.title,
      });
    case EDIT_TIME:
      return Object.assign({}, state, {
        time: action.payload.time,
      });
    case EDIT_INGREDIENT:
      return Object.assign({}, state, {
        ingredient: action.payload.ingredient,
      });
    case EDIT_DESCRIPTION:
      return Object.assign({}, state, {
        description: action.payload.description,
      });
    case EDIT_IMAGE:
      return Object.assign({}, state, {
        image: action.payload.image,
      });
    case EDIT_SERVING:
      return Object.assign({}, state, {
        serving: action.payload.serving,
      });
    case EDIT_DIFIICULTY:
      return Object.assign({}, state, {
        difficulty: action.payload.difficulty,
      });
    case REEDIT_ALL_CONTENTS:
      return initialState;
    default:
      return state;
  }
};

export default EditRecipeContentsReducer;
