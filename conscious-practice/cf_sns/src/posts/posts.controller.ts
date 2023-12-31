import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AccessTokenGuard } from '../auth/guard/bearer-token.guard';
import { User } from '../users/decorator/user.decorator';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { UsersEntity } from '../users/entities/users.entity';
import { DataSource, QueryRunner as QR } from 'typeorm';
import { PostImagesService } from './image/images.service';
import { LogInterceptor } from '../common/interceptor/log.interceptor';
import { TransactionInterceptor } from '../common/interceptor/transaction.interceptor';
import { QueryRunner } from '../common/decorator/query-runner.decorator';
import { ImageEntityType } from '../common/entities/image.entity';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postImagesService: PostImagesService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  @UseInterceptors(LogInterceptor)
  // @UseFilters(HttpExceptionFilter)
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

  @UseInterceptors(TransactionInterceptor)
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @QueryRunner() qr: QR,
    @User('id')
    userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
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
    return this.postsService.findById(post.id, qr);
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
