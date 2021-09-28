import { SET_ACCESSTOKEN, REMOVE_ACCESSTOKEN } from "actions/Accesstoken";
import { Accesstoken } from "types";

const initialState: Accesstoken = {
  accesstoken: "",
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
        accesstoken: action.payload.accesstoken,
      });
    case REMOVE_ACCESSTOKEN:
      return Object.assign({}, state, {
        accesstoken: "",
      });
    default:
      return state;
  }
};

export default AccesstokenReducer;
