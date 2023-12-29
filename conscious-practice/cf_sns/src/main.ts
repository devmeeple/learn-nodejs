import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // 페이지네이션 구현 시 쿼리에 요청(예: 정렬방법)이 들어오지 않아도 기본값을 할당하기 위해 옵션 추가
      transform: true,
      // 자료형 데코레이터를 기준으로 변환 할 수 있도록 옵션 추가 class-validation과 함께 사용
      transformOptions: {
        enableImplicitConversion: true, // 암묵적으로 형 변환
      },
    }),
  );
  await app.listen(3000);
}

bootstrap();
