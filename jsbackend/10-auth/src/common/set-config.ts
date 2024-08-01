import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setNestApp<T extends INestApplication>(app: T) {
  app.useGlobalPipes(new ValidationPipe());
}
