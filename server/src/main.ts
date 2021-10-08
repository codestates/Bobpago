import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [`${process.env.CLIENT_URL}`, 'https://www.bobpago.com'],
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator(@)가 없는 속성이 들어오면 해당 속성은 제거하고 받아들인다.
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 값이 넘어오면 request자체를 막는다.
      transform: true, // 클라이언트에서 값을 받자마자 타임을 정의한대로 자동 형변환을 한다.
    }),
  );
  app.use(
    ['/api', '/api-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Bobpago API')
    .setDescription('Bobpago 개발을 위한 API 문서')
    .setVersion('1.0.0')
    .build();
  const apiEnable: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, apiEnable);
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      supportedSubmitMethods: [],
    },
  });
  await app.listen(process.env.PORT);
}
bootstrap();
