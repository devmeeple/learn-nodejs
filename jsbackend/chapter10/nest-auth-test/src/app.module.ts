import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    /**
     * type: 데이터베이스 타입(sqlite, mysql, postgres...)
     * database: 데이터베이스 이름
     * entities: 엔티티 객체
     * synchronize: 스키마 동기화, 개발시에만 true
     * logging: 실행 로그 확인
     */
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'nest-auth-test.sqlite',
      entities: [],
      synchronize: true,
      logging: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
