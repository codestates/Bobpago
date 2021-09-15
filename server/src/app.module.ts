import { Module } from '@nestjs/common';
import { MeModule } from './me/me.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { Comment } from './entities/comment.entity';
import { Ingredient } from './entities/ingredient.entity';
import { Recipe } from './entities/recipe.entity';
import { User } from './entities/user.entity';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forFeature([
      Comment,
      Ingredient,
      Recipe,
      User,
      RecipeIngredient,
    ]),
    MeModule,
    AuthModule,
    CommentsModule,
    RecipesModule,
    IngredientsModule,
    UsersModule,
  ],
})
export class AppModule {}
