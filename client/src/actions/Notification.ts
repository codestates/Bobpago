export const NOTIFY = "NOTIFY";
export const ENQUEUE_NOTIFICATION = "ENQUEUE_NOTIFICATION";
export const DEQUEUE_NOTIFICATION = "DEQUEUE_NOTIFICATION";
export const RESET_NOTIFICATION = "RESET_NOTIFICATION";

export const notify =
  (message: string, dismissTime = 4200) =>
  (dispatch: any) => {
    const uuid = Math.random();
    dispatch(enqueueNotification(message, dismissTime, uuid));
    setTimeout(() => {
      dispatch(dequeueNotification(message));
    }, dismissTime);
  };

export const enqueueNotification = (
  message: string,
  dismissTime: number,
  uuid: number
) => {
  return {
    type: ENQUEUE_NOTIFICATION,
    payload: {
      message,
      dismissTime,
      uuid,
    },
  };
};

export const dequeueNotification = (message: string) => {
  return {
    type: DEQUEUE_NOTIFICATION,
    payload: {
      message,
    },
  };
};

export const resetNotification = () => {
  return {
    type: RESET_NOTIFICATION,
  };
};
