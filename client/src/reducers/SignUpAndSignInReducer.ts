import {
  SHOW_SIGNUP_PAGE,
  SHOW_SIGNIN_PAGE,
  SHOW_NOTHING,
} from "actions/SignUpAndSignIn";

const initialState: InitialState = {
  signUpDisplay: false,
  loginDisplay: false,
};

interface Action {
  type: string;
}

interface InitialState {
  signUpDisplay: boolean;
  loginDisplay: boolean;
}

const SignUpAndSignInReducer = (
  state: InitialState = initialState,
  action: Action
) => {
  switch (action.type) {
    case SHOW_SIGNUP_PAGE:
      return {
        signUpDisplay: true,
        loginDisplay: false,
      };
    case SHOW_SIGNIN_PAGE:
      return {
        signUpDisplay: false,
        loginDisplay: true,
      };
    case SHOW_NOTHING:
      return {
        signUpDisplay: false,
        loginDisplay: false,
      };
    default:
      return state;
  }
};

export default SignUpAndSignInReducer;
