export const SHOW_SIGNUP_PAGE = "SHOW_SIGNUP_PAGE";
export const SHOW_SIGNIN_PAGE = "SHOW_SIGNIN_PAGE";
export const SHOW_NOTHING = "SHOW_NOTHING";

export const showSignUp = () => {
  return {
    type: SHOW_SIGNUP_PAGE,
  };
};

export const showSignIn = () => {
  return {
    type: SHOW_SIGNIN_PAGE,
  };
};

export const showNothing = () => {
  return {
    type: SHOW_NOTHING,
  };
};
