import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import * as process from 'process';
import config from './configs/config';

console.log('env : ' + process.env.NODE_ENV);
console.log('current working directory : ' + process.cwd()); // 현재 디렉토리 출력

@Module({
  // isGlobal, cache, envFilePath 자주사용
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
          load: [config],
          cache: true,
          expandVariables: true, // 확장 변수 옵션
      }),
      WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
