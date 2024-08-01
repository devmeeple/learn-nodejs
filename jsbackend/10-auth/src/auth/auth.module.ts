import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // 유저 모듈의 서비스를 주입받아 사용한다.
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
