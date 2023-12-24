import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsEntity } from './entities/posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<PostsEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  getPost(@Param('id') postId: string) {
    return this.postsService.findById(+postId);
  }

  @Post()
  create(@Body() request: CreatePostDto) {
    return this.postsService.create(request);
  }

  @Patch(':id')
  update(@Param('id') postId: string, @Body() request: UpdatePostDto) {
    return this.postsService.update(+postId, request);
  }

  @Delete(':id')
  remove(@Param('id') postId: string) {
    return this.postsService.remove(+postId);
  }
}
