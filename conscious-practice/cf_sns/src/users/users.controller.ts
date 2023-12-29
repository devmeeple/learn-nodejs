import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * serializer(직렬화): 현재 시스템에서 사용되는 데이터의 구조를 다른 시스템에서도 사용할 수 있도록 변환
   * class object -> JSON
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
