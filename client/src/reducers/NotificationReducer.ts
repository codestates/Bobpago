import {
  ENQUEUE_NOTIFICATION,
  DEQUEUE_NOTIFICATION,
  RESET_NOTIFICATION,
} from "../actions/Notification";
import { Notification } from "types";

const initialState = {
  notifications: [],
};

interface Payload {
  message: string;
  dismissTime?: number;
  uuid?: number;
}

interface Action {
  type: string;
  payload: Payload;
}

const NotificationReducer = (
  state: Notification = initialState,
  action: Action
) => {
  switch (action.type) {
    case ENQUEUE_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: [...state.notifications, action.payload],
      });
    case DEQUEUE_NOTIFICATION:
      let copiedState: Notification = Object.assign({}, state);
      for (let i = 0; i < copiedState.notifications.length; i++) {
        if (copiedState.notifications[i].message === action.payload.message) {
          copiedState.notifications.splice(i, 1);
          return Object.assign({}, copiedState);
        }
      }
      return state;
    case RESET_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: [],
      });
    default:
      return state;
  }
};

export default NotificationReducer;
