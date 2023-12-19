import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  // 모듈은 어플리케이션의 일부분 이다. 한 가지 역할을 담당한다.
  // 예) 인증을 담당하는 users 모듈
  // app.module.ts 는 root 모듈이다. 앱에서 사용하고자 하는 모듈은 모두 이곳에 정의되어야 한다.
  imports: [],
  controllers: [MoviesController], // url을 가져오고 함수를 실행 -> express 라우터, 컨트롤러는 URL을 가져오고 함수를 실행하는 역할을 가진다.
  providers: [MoviesService],
})
export class AppModule {}
