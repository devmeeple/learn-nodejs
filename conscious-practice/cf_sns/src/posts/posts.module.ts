import { BadRequestException, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './entities/posts.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CommonModule } from '../common/common.module';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multer from 'multer';
import { POST_IMAGE_PATH } from '../common/const/path.const';
import { v4 as uuid } from 'uuid';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CommonModule,
    MulterModule.register({
      limits: {
        // 바이트 단위로 입력 예) 10MB
        fileSize: 10000000,
      },
      fileFilter: (req, file, cb) => {
        // 확장자 가져오기
        const ext = extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
          return cb(
            new BadRequestException(
              'JPG / JPEG / PNG 파일만 업로드 가능합니다',
            ),
            false,
          );
        }
        return cb(null, true);
      },
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, POST_IMAGE_PATH);
        },
        filename: (req, file, callback) => {
          callback(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
    TypeOrmModule.forFeature([PostsEntity]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
