import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.dto';

/**
 * register: 회원가입 http :3000/auth/register email=andy5@podo.com password=1234 username=andy
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() request: CreateUserDto) {
    return this.authService.register(request);
  }
}
