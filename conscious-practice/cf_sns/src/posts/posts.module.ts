import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './entities/posts.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CommonModule } from '../common/common.module';
import { ImageEntity } from '../common/entities/image.entity';
import { PostImagesService } from './image/images.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CommonModule,
    TypeOrmModule.forFeature([PostsEntity, ImageEntity]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostImagesService],
})
export class PostsModule {}
