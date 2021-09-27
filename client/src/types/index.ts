export interface SignUpSignInSlide {
  signUpDisplay: boolean;
  loginDisplay: boolean;
}

export interface WriteRecipePage {
  currentPage: number;
}

type NumOrNull = number | null;
type StringOrUndifined = string | undefined;

interface Payload {
  message: string;
  dismissTime?: number;
  uuid?: number;
}

export interface WriteRecipeContent {
  title: string;
  ingredient: NumOrNull[];
  time: number;
  description: string[];
  image: string[];
  difficulty: number;
  serving: number;
}

export interface Notification {
  notifications: Payload[];
}

export interface IngredientGoodAndBadData {
  badData: Array<{ name: string; image: string }>;
  goodData: Array<{ name: string; image: string }>;
}
