export class RecipeImageDto {
  private imageUrls: string[];
  private descriptions: string[];

  constructor(recipeImages: any[]) {
    recipeImages.forEach((image) => {
      this.imageUrls.push(image.imageUrl);
      this.descriptions.push(image.description);
    });
  }

  public get getImageUrls(): string[] {
    return this.imageUrls;
  }

  public get getDescriptions(): string[] {
    return this.descriptions;
  }
}
