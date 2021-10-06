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
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
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
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(AuthCheckerMiddleware)
      .exclude(
        { path: 'signup', method: RequestMethod.POST },
        { path: 'restore', method: RequestMethod.POST },
        { path: 'auth/signin', method: RequestMethod.POST },
        { path: 'auth/:userId/tokenRequest', method: RequestMethod.GET },
        { path: 'auth/kakao', method: RequestMethod.GET },
        { path: 'auth/naver', method: RequestMethod.GET },
        { path: 'auth/google', method: RequestMethod.GET },
        { path: 'recipe/:recipeId', method: RequestMethod.GET },
        { path: 'recipe/match', method: RequestMethod.POST },
        { path: 'recipe/:recipeId/comment', method: RequestMethod.GET },
        { path: 'ingredient', method: RequestMethod.GET },
        { path: 'ingredient/main', method: RequestMethod.GET },
        { path: 'ingredient/basic', method: RequestMethod.GET },
        { path: 'user/:userId', method: RequestMethod.GET },
        { path: 'api', method: RequestMethod.GET },
        { path: '', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
