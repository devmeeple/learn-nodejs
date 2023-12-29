import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './posts/entities/posts.entity';
import { UsersModule } from './users/users.module';
import { UsersEntity } from './users/entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    // 환경변수로 수정할 수 있다
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [PostsEntity, UsersEntity],
      synchronize: true, // 개발환경에서는 true로 하는게 좋지만, 프로덕션 환경에서는 의도치 않은 변화가 발생할 수 있기 때문에 false
      logging: true,
    }),
    PostsModule,
    UsersModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  // 전역에서 인터셉터를 사용하기 위해 지정
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
