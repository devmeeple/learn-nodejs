import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';

/**
 * register: 회원가입
 */
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(request: CreateUserDto) {
    // 이미 존재하는 유저인지 확인
    const user = await this.userService.getUser(request.email);
    if (user) {
      throw new HttpException(
        `${user.email} 이미 존재하는 유저입니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // 패스워드 암호화
    const encryptedPassword = bcrypt.hashSync(request.password, 10);

    // 데이터베이스 저장, 에러발생시 서버에러
    try {
      const user = await this.userService.createUser({
        ...request,
        password: encryptedPassword,
      });

      // 응답값에 password를 제공하지 않음
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('서버 에러', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
