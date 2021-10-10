export const GET_FILTER_DATA = "BRING_FILTER_DATA";
export const GET_ALL_DATA = "GET_ALL_DATA";
export const GET_SMALL_DATA = "GET_SMALL_DATA";
export const CLICK_DATA = "CLICK_DATA";
export const CLEAR_CLICK_DATA = "CLEAR_CLICK_DATA";

export const getFilterData = () => {
  return {
    type: GET_FILTER_DATA,
  };
};

export const getAllData = () => {
  return {
    type: GET_ALL_DATA,
  };
};

export const getSmallData = () => {
  return {
    type: GET_SMALL_DATA,
  };
};

export const getClickData = () => {
  return {
    type: CLICK_DATA,
  };
};

export const clearClickData = () => {
  return {
    type: CLEAR_CLICK_DATA,
  };
};
