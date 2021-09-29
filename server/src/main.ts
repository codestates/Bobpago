import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001',
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
  await app.listen(3000);
}
bootstrap();
