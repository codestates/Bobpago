export const GO_TO_NEXT_PAGE_EDIT = "TURN_NEXT_PAGE_EDIT";
export const GO_TO_PREV_PAGE_EDIT = "TURN_PREV_PAGE_EDIT";
export const RESET_EDIT_PAGE = "RESET_EDIT_PAGE";

export const goToNextPageEdit = () => {
  return {
    type: GO_TO_NEXT_PAGE_EDIT,
  };
};

export const goToPrevPageEdit = () => {
  return {
    type: GO_TO_PREV_PAGE_EDIT,
  };
};

export const resetEditPageEdit = () => {
  return {
    type: RESET_EDIT_PAGE,
  };
};
