import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // PassportStrategy 믹스인
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' }); // 기본값 변경
  }

  // 유저 정보의 유효성 검증
  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return null;
    }
    return user;
  }
}
