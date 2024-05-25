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
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

/**
 * create: 유저 생성 http POST :3000/user username=andy password=test1234 email=andy@podo.com
 * email: 유저 정보 확인 http :3000/user/andy@podo.com
 * update: 유저 정보 수정 http PUT :3000/user/andy@podo.com email=andy@podo.com username=andy2 password=test12345
 * delete: 유저 삭제 http DELETE :3000/user/andy@podo.com
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('/:email')
  getUser(@Param('email') email: string) {
    return this.userService.getUser(email);
  }

  @Put('/:email')
  updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(email, user);
  }

  @Delete('/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
}
