export const GET_FILTER_DATA = "BRING_FILTER_DATA";
export const CLICK_DATA = "CLICK_DATA";

export const getFilterData = () => {
  return {
    type: GET_FILTER_DATA,
  };
};

export const getClickData = () => {
  return {
    type: CLICK_DATA,
  };
};
