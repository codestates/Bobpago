export const SET_TITLE = "SET_TITLE";
export const SET_TIME = "SET_TIME";
export const SET_INGREDIENT = "SET_INGREDIENT";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_IMAGE = "SET_IMAGE";
export const SET_DIFIICULTY = "SET_DIFIICULTY";
export const SET_SERVING = "SET_SERVING";
export const RESET_ALL_CONTENTS = "RESET_ALL_CONTENTS";

export const setTitle = (title: string) => {
  console.log(title);
  return {
    type: SET_TITLE,
    payload: { title },
  };
};

export const setTime = (time: number) => {
  return {
    type: SET_TIME,
    payload: { time },
  };
};

export const setIngredient = (ingredient: number[]) => {
  return {
    type: SET_INGREDIENT,
    payload: { ingredient },
  };
};

export const setDescription = (description: string[]) => {
  return {
    type: SET_DESCRIPTION,
    payload: { description },
  };
};

export const setImage = (image: string[]) => {
  return {
    type: SET_IMAGE,
    payload: { image },
  };
};

export const setServing = (serving: number) => {
  return {
    type: SET_SERVING,
    payload: { serving },
  };
};

export const setDifficulty = (difficulty: number) => {
  return {
    type: SET_DIFIICULTY,
    payload: { difficulty },
  };
};

export const resetAllContents = () => {
  return {
    type: RESET_ALL_CONTENTS,
  };
};
