export interface SignUpSignInSlide {
  signUpDisplay: boolean;
  loginDisplay: boolean;
}

export interface WriteRecipePage {
  currentPage: number;
}

type NumOrNull = number | null;

export interface WriteRecipeContent {
  title: string;
  ingredient: NumOrNull[];
  time: number | null;
  description: string[];
  image: string[];
}

export interface IngredientGoodAndBadData {
  badData: Array<{ name: string; image: string }>;
  goodData: Array<{ name: string; image: string }>;
}
