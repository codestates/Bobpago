export const SET_ACCESSTOKEN = "SET_ACCESSTOKEN";
export const REMOVE_ACCESSTOKEN = "REMOVE_ACCESSTOKEN";

export const setAccessToken = (accesstoken: string) => {
  return {
    type: SET_ACCESSTOKEN,
    payload: { accesstoken },
  };
};

export const removeAccessToken = () => {
  return {
    type: REMOVE_ACCESSTOKEN,
  };
};
