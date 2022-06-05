export class RecipeIngredientDto {
  private ingredients: any;

  constructor(recipeIngredients: any[]) {
    const [main, sub] = [[], []];
    recipeIngredients.forEach((el) => {
      const { __ingredient__ } = el;
      __ingredient__.type === 'main'
        ? main.push(__ingredient__)
        : sub.push(__ingredient__);
    });

    this.ingredients = { main, sub };
  }

  public get getIngredients(): any {
    return this.ingredients;
  }
}
