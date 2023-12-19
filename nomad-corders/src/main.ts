import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 1) main.ts의 파일명은 변경되면 안된다. 2) 프로그램의 시작은 main.ts에서 시작된다.
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
