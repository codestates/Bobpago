import { Recipe } from 'src/entities/recipe.entity';

export class RecipeDto {
  private id: number;
  private title: string;
  private level: number;
  private amount: number;
  private thumbnail: string;
  private estTime: number;
  private views: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(entity: Recipe) {
    this.id = entity.id;
    this.title = entity.title;
    this.level = entity.level;
    this.amount = entity.amount;
    this.thumbnail = entity.thumbnail;
    this.estTime = entity.estTime;
    this.views = entity.views;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }

  public addViews() {
    this.views = ++this.views;
  }
}
