export const GO_TO_NEXT_PAGE = "TURN_NEXT_PAGE";
export const GO_TO_PREV_PAGE = "TURN_PREV_PAGE";

export const goToNextPage = () => {
  return {
    type: GO_TO_NEXT_PAGE,
  };
};

export const goToPrevPage = () => {
  return {
    type: GO_TO_PREV_PAGE,
  };
};
