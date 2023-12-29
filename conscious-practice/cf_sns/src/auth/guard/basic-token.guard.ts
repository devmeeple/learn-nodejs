import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

/**
 * 1) 요청 객체를 불러오고 authorization 헤더로부터 토큰을 가져온다.
 * 2) authService.extractTokenFromHeader 를 사용해서 사용 할 수 있는 형태의 토큰을 추출
 * 3) authService.decodeBasicToken 을 실행해서 email, password 추출
 * 4) authService.authenticateEmailAndPassword / email, password 를 통해 사용자를 가져온다.
 * 5) 찾아 낸 사용자를 (1) 요청 객채에 붙인다.
 */

@Injectable()
export class BasicTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // 처리되지 않은 원시형태의 토큰
    const rawToken = request.headers['authorization'];

    if (!rawToken) {
      throw new UnauthorizedException('토큰이 없습니다');
    }

    const basicToken = this.authService.extractTokenFromHeader(rawToken, false);
    const { email, password } = this.authService.decodeBasicToken(basicToken);

    request.user = await this.authService.authenticateWithEmailAndPassword({
      email,
      password,
    });

    return true;
  }
}
