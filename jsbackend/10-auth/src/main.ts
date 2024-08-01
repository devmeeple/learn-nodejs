import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setNestApp } from './common/set-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validation Pipe 전역 설정
  setNestApp(app);
  await app.listen(3000);
}

bootstrap();
