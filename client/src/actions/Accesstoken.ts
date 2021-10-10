export const SET_ACCESSTOKEN = "SET_ACCESSTOKEN";
export const REMOVE_ACCESSTOKEN = "REMOVE_ACCESSTOKEN";
export const REISSUE_ACCESSTOKEN = "REISSUE_ACCESSTOKEN";

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

export const reissueAccessToken = (accessToken: string) => {
  return {
    type: REISSUE_ACCESSTOKEN,
    payload: { accessToken },
  };
};

export const removeAccessToken = () => {
  return {
    type: REMOVE_ACCESSTOKEN,
  };
};
