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
  badData: Array<{ id?: number; name: string; image: string }>;
  goodData: Array<{ id?: number; name: string; image: string }>;
  filterData?: Array<{ id?: number; name: string; image: string }> | undefined;
}

export interface IngredientClickData {
  clickData: Array<{ id: number; name: string }>;
}

export interface Accesstoken {
  accessToken: string;
  tokenType: string;
  userId: number | null;
}

export interface MatchRecipe {
  data: object[];
}

export interface DetailRecipe {
  user: { id: number; nickname: string };
  recipe: any;
  ingredients: any;
}
