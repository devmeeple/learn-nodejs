import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicTokenGuard } from './guard/basic-token.guard';
import { RefreshTokenGuard } from './guard/bearer-token.guard';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(RefreshTokenGuard)
  @Post('token/access')
  createAccessToken(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);
    const accessToken = this.authService.rotateToken(token, false);
    return { accessToken };
  }

  @UseGuards(RefreshTokenGuard)
  @Post('token/refresh')
  createRefreshToken(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);
    const refreshToken = this.authService.rotateToken(token, true);
    return { refreshToken };
  }

  @UseGuards(BasicTokenGuard)
  @Post('login/email')
  loginWithEmail(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  registerWithEmail(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerWithEmail(registerUserDto);
  }
}
