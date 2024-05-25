import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 전역 파이프에 validationPipe 추가
  app.use(cookieParser()); // 쿠키 파서 설정
  app.use(
    session({
      secret: 'very-important-secret', // 암호화에 사용하는 키
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // https를 사용하지 않을 때 false
    }),
  );

  // passport 초기화 및 세션 저장소 초기화
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}

bootstrap();
