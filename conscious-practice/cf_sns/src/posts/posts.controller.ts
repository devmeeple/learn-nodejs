import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AccessTokenGuard } from '../auth/guard/bearer-token.guard';
import { User } from '../users/decorator/user.decorator';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { UsersEntity } from '../users/entities/users.entity';
import { ImageEntityType } from '../common/entities/image.entity';
import { DataSource } from 'typeorm';
import { PostImagesService } from './image/images.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postImagesService: PostImagesService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  findAll(@Query() query: PaginatePostDto) {
    return this.postsService.cursorPaginate(query);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post('random')
  async generatePostList(@User() user: UsersEntity) {
    await this.postsService.generatePostList(user.id);
    return true;
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @User('id') userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      const post = await this.postsService.create(userId, createPostDto, qr);
      for (let i = 0; i < createPostDto.images.length; i++) {
        await this.postImagesService.createPostImage(
          {
            post,
            order: i,
            path: createPostDto.images[i],
            type: ImageEntityType.POST_IMAGE,
          },
          qr,
        );
      }
      await qr.commitTransaction();
      await qr.release();
      return this.postsService.findById(post.id);
    } catch (e) {
      await qr.rollbackTransaction();
      await qr.release();

      throw new InternalServerErrorException('잘못된 접근입니다');
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') postId: string) {
    return this.postsService.remove(+postId);
  }
}
