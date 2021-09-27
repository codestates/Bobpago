export const EDIT_TITLE = "EDIT_TITLE";
export const EDIT_TIME = "EDIT_TIME";
export const EDIT_INGREDIENT = "EDIT_INGREDIENT";
export const EDIT_DESCRIPTION = "EDIT_DESCRIPTION";
export const EDIT_IMAGE = "EDIT_IMAGE";
export const EDIT_DIFIICULTY = "EDIT_DIFIICULTY";
export const EDIT_SERVING = "EDIT_SERVING";
export const REEDIT_ALL_CONTENTS = "REEDIT_ALL_CONTENTS";

export const editTitle = (title: string) => {
  return {
    type: EDIT_TITLE,
    payload: { title },
  };
};

export const editTime = (time: number) => {
  return {
    type: EDIT_TIME,
    payload: { time },
  };
};

export const editIngredient = (ingredient: number[]) => {
  return {
    type: EDIT_INGREDIENT,
    payload: { ingredient },
  };
};

export const editDescription = (description: string[]) => {
  return {
    type: EDIT_DESCRIPTION,
    payload: { description },
  };
};

export const editImage = (image: string[]) => {
  return {
    type: EDIT_IMAGE,
    payload: { image },
  };
};

export const editServing = (serving: number) => {
  return {
    type: EDIT_SERVING,
    payload: { serving },
  };
};

export const editDifficulty = (difficulty: number) => {
  return {
    type: EDIT_DIFIICULTY,
    payload: { difficulty },
  };
};

export const resetEditAllContents = () => {
  return {
    type: REEDIT_ALL_CONTENTS,
  };
};
