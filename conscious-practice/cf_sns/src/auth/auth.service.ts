import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import {
  ENV_HASH_ROUND_KEY,
  ENV_JWT_SECRET_KEY,
} from '../common/const/env-keys.const';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 토큰 사용 방식
   * 1) 로그인 또는 회원 가입을 진행하면 accessToken, refreshToken 발급받음.
   * 2) 로그인 시 Basic Token 과 함께 요청을 보낸다. '이메일:비밀번호'를 Base64로 인코딩 ex: {authorization: 'Basic {token}'}
   * 3) 아무나 접근 할 수 없는 정보(private route)를 접근 할 때는 accessToken 을 Header 에 추가해서 요청과 함께 보낸다. ex: {authorization: 'Bearer {token}'}
   * 4) 토큰과 요청을 함께 받은 서버는 토큰 검증을 통해 현재 요청을 보낸 사용자가 누구인지 확인 가능하다.
   * 5) 토큰은 만료 기간이 있다. 만료 기간이 지나면 새로 토큰을 발급받아야 한다. -> jwtService.verify()
   * 6) 토큰이 만료되면 각각 토큰을 새로 발급 받을 수 있는 엔드포인트에 요청을 보내 새로운 토큰을 발급받고 사용해서 private route 에 접근한다.
   */

  /**
   * 헤더에서 토큰 추출하여 검증
   */
  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' ');
    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 토큰입니다');
    }

    // 토큰 실제 값
    return splitToken[1];
  }

  /**
   * 토큰에 담겨있는 정보를 복호화
   */
  decodeBasicToken(base64String: string) {
    // Buffer: 이진데이터(바이너리) 를 담을 수 있는 객체
    const decoded = Buffer.from(base64String, 'base64').toString('utf-8');
    const split = decoded.split(':');

    if (split.length !== 2) {
      throw new UnauthorizedException('잘못된 유형의 토큰입니다');
    }

    // 구조분해 할당으로 할당
    const [email, password] = split;

    return { email, password };
  }

  /**
   * 토큰 검증
   * @param token
   */
  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      });
    } catch (e) {
      throw new UnauthorizedException('토큰이 만료되었거나 잘못된 토큰입니다');
    }
  }

  rotateToken(token: string, isRefreshToken: boolean) {
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
    });

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException(
        '토큰 재발급은 Refresh 토큰으로만 가능합니다',
      );
    }

    return this.signToken({ ...decoded }, isRefreshToken);
  }

  /**
   * registerWithEmail: 이메일을 사용한 회원가입
   * nickname, email, password 를 입력받고 사용자 생성
   * accessToken, refreshToken 반환(회원 가입 후 바로 로그인 하기 위함)
   */
  async registerWithEmail(user: RegisterUserDto) {
    const hash = await bcrypt.hash(
      user.password,
      parseInt(this.configService.get<string>(ENV_HASH_ROUND_KEY)),
    );
    const createdUser = await this.usersService.createUser({
      ...user,
      password: hash,
    });

    return this.loginUser(createdUser);
  }

  /**
   * loginWithEmail: 이메일을 사용한 로그인
   * email, password 를 통한 사용자 검증
   * 검증이 완료되면 accessToken, refreshToken 반환
   */
  async loginWithEmail(user: Pick<UsersEntity, 'email' | 'password'>) {
    const existingUser = await this.authenticateWithEmailAndPassword(user);
    return this.loginUser(existingUser);
  }

  /**
   * loginUser
   * 회원가입, 로그인에 필요한 accessToken, refreshToken 반환
   */
  loginUser(user: Pick<UsersEntity, 'email' | 'id'>) {
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  /**
   * signToken
   * accessToken, refreshToken 생성
   * Payload
   * email
   * sub -> id
   * type: 'access' | 'refresh'
   */
  signToken(user: Pick<UsersEntity, 'email' | 'id'>, isRefreshToken: boolean) {
    const payload = {
      email: user.email,
      sub: user.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(ENV_JWT_SECRET_KEY),
      expiresIn: isRefreshToken ? 3600 : 300,
    });
  }

  /**
   * authenticateWithEmailAndPassword
   * 로그인 시 필요한 유효성 검증
   * 1. 사용자 존재 여부(이메일), 2. 비밀번호 일치(hash 비교), 3. 사용자 반환
   */
  async authenticateWithEmailAndPassword(
    user: Pick<UsersEntity, 'email' | 'password'>,
  ) {
    const existingUser = await this.usersService.findUserByEmail(user.email);

    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 사용자입니다');
    }

    const isMatch = await bcrypt.compare(user.password, existingUser.password);

    if (!isMatch) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다');
    }

    return existingUser;
  }
}
