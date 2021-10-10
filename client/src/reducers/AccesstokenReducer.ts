import {
  SET_ACCESSTOKEN,
  REMOVE_ACCESSTOKEN,
  REISSUE_ACCESSTOKEN,
} from "actions/Accesstoken";
import { Accesstoken } from "types";

const initialState: Accesstoken = {
  accessToken: "",
  tokenType: "",
  userId: null,
};

interface Action {
  type: string;
  payload?: any;
}

const AccesstokenReducer = (
  state: Accesstoken = initialState,
  action: Action
) => {
  switch (action.type) {
    case SET_ACCESSTOKEN:
      return Object.assign({}, state, {
        accessToken: action.payload.accessToken,
        tokenType: action.payload.tokenType,
        userId: action.payload.userId,
      });
    case REISSUE_ACCESSTOKEN:
      return Object.assign({}, state, {
        accessToken: action.payload.accessToken,
      });
    case REMOVE_ACCESSTOKEN:
      return Object.assign({}, state, {
        accessToken: "",
        tokenType: "",
        userId: null,
      });
    default:
      return state;
  }
};

export default AccesstokenReducer;
