import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

/**
 * create: 유저 생성
 * email: 유저 정보 확인
 * update: 유저 정보 수정
 * delete: 유저 삭제
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Get('/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    console.log(user);
    return user;
  }

  @Put('/:email')
  updateUser(@Param('email') email: string, @Body() user: User) {
    return this.userService.updateUser(email, user);
  }

  @Delete('/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
}
