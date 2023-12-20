import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  home(): string {
    return '노마드코더 영화 API 만들기';
  }
}
