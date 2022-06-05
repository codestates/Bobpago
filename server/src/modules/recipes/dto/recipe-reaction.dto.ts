import { RecipeReaction } from 'src/entities/recipe-reaction.entity';

export class RecipeReactionDto {
  private state: number;
  private count: number;

  constructor(recipeReactions: any, userId?: number) {
    if (userId) {
      this.state = recipeReactions.some((reaction) => {
        return reaction.userId === userId;
      })
        ? 1
        : 0;
    }
    this.count = recipeReactions.length;
  }

  public get getState(): number {
    return this.state;
  }

  public get getCount(): number {
    return this.count;
  }
}
