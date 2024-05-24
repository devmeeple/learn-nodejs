import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { LoginGuard } from './auth.guard';

/**
 * register: 회원가입 http :3000/auth/register email=andy5@podo.com password=1234 username=andy
 * login: 로그인 http POST :3000/auth/login email=andy5@podo.com password=1234
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() request: CreateUserDto) {
    return this.authService.register(request);
  }

  @Post('login')
  async login(@Request() req, @Response() res) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    // 유저 정보가 있으면 쿠키 정보를 Response에 추가
    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false, // 브라우저에서 읽을 수 있도록 함
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }

    return res.send({ message: '로그인 성공' });
  }

  @UseGuards(LoginGuard)
  @Post('login2')
  async login2(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }

    return res.send({ message: '로그인2 성공' });
  }

  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    return '로그인 성공하면 보이는 글';
  }
}
