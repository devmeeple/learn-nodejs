import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // 페이지네이션 구현 시 쿼리에 요청(예: 정렬방법)이 들어오지 않아도 기본값을 할당하기 위해 옵션 추가
      transform: true,
    }),
  );
  await app.listen(3000);
}

bootstrap();
