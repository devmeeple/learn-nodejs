import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './posts/entities/posts.entity';

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
      entities: [PostsEntity],
      synchronize: true, // 개발환경에서는 true로 하는게 좋지만, 프로덕션 환경에서는 의도치 않은 변화가 발생할 수 있기 때문에 false
      logging: true,
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
