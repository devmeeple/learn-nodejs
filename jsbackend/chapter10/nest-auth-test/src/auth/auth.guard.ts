import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // 쿠키가 있으면 인증됨
    if (request.cookies['login']) {
      return true;
    }

    // 쿠키가 없으면 request body 정보 확인
    if (!request.body.email || !request.body.password) {
      return false;
    }

    const user = await this.authService.validateUser(
      request.body.email,
      request.body.password,
    );

    // 유저 정보가 없으면 false 반환
    if (!user) {
      return false;
    }

    // 있으면 요청에 user 정보를 추가하고 true 반환
    request.user = user;
    return true;
  }
}
