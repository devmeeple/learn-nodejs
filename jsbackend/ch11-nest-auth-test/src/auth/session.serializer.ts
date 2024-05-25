import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  // 세션에 정보를 저장할 때 사용
  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user.email);
  }

  // 세션에서 정보를 꺼내올 때 사용
  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ) {
    const user = await this.userService.getUser(payload);
    if (!user) {
      done(new Error('유저를 찾을 수 없습니다'), null);
      return;
    }
    const { password, ...userInfo } = user;

    // 유저 정보가 있다면 유저 정보 반환
    done(null, userInfo);
  }
}
