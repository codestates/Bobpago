export const SET_ACCESSTOKEN = "SET_ACCESSTOKEN";
export const REMOVE_ACCESSTOKEN = "REMOVE_ACCESSTOKEN";

export const setAccessToken = (
  accessToken: string,
  tokenType: string,
  userId: number
) => {
  return {
    type: SET_ACCESSTOKEN,
    payload: { accessToken, tokenType, userId },
  };
};

export const removeAccessToken = () => {
  return {
    type: REMOVE_ACCESSTOKEN,
  };
};
