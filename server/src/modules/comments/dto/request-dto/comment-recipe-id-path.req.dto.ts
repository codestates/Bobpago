import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { RecipeIdPathReqDto } from 'src/modules/recipes/dto/request-dto/recipe-id-path.req.dto';

export class CommentAndRecipeIdPathReqDto extends RecipeIdPathReqDto {
  @ApiProperty()
  @IsNumber()
  commentId: number;
}
