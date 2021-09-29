import { SET_ACCESSTOKEN, REMOVE_ACCESSTOKEN } from "actions/Accesstoken";
import { Accesstoken } from "types";

const initialState: Accesstoken = {
  accessToken: "",
  tokenType: "",
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
      });
    case REMOVE_ACCESSTOKEN:
      return Object.assign({}, state, {
        accessToken: "",
      });
    default:
      return state;
  }
};

export default AccesstokenReducer;