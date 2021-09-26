import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MeModule } from './me/me.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeORMConfig } from './config/typeorm.config';
import { ImageModule } from './image/image.module';
import { AuthCheckerMiddleware } from './middleware/auth-checker.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forFeature([User]),
    MeModule,
    AuthModule,
    CommentsModule,
    RecipesModule,
    IngredientsModule,
    UsersModule,
    ImageModule,
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      },
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(AuthCheckerMiddleware).forRoutes(
      { path: 'auth/signout', method: RequestMethod.POST },
      { path: 'me', method: RequestMethod.GET },
      { path: 'me', method: RequestMethod.PATCH },
      { path: 'me', method: RequestMethod.DELETE },
      { path: ':recipeId/bookmarks', method: RequestMethod.POST },
      { path: ':recipeId/bookmarks', method: RequestMethod.DELETE },
      { path: 'checkMyInfo', method: RequestMethod.POST },
      { path: 'user/:userId/follower', method: RequestMethod.GET },
      { path: 'user/:userId/followee', method: RequestMethod.GET },
      { path: 'user/:userId/follow', method: RequestMethod.POST },
      { path: 'user/:userId/follow', method: RequestMethod.DELETE },
      { path: 'recipe', method: RequestMethod.POST },
      { path: 'recipe/:recipeId', method: RequestMethod.PATCH },
      { path: 'recipe/:recipeId', method: RequestMethod.DELETE },
      { path: 'recipe/:recipeId', method: RequestMethod.POST },
      { path: 'recipe/:recipeId/comment', method: RequestMethod.POST },
      {
        path: 'recipe/:recipeId/comment/:commentId',
        method: RequestMethod.PATCH,
      },
      {
        path: 'recipe/:recipeId/comment/:commentId',
        method: RequestMethod.DELETE,
      },
      {
        path: 'recipe/:recipeId/comment/:commentId',
        method: RequestMethod.POST,
      },
      {
        path: 'image/upload',
        method: RequestMethod.POST,
      },
    );
  }
}
