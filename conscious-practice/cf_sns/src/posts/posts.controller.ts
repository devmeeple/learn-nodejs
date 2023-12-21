import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostModel, PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): PostModel[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  getPost(@Param('id') postId: string): PostModel {
    return this.postsService.findById(+postId);
  }

  @Post()
  create(@Body() request: CreatePostDto): PostModel {
    return this.postsService.create(request);
  }

  @Patch(':id')
  update(
    @Param('id') postId: string,
    @Body() request: UpdatePostDto,
  ): PostModel {
    return this.postsService.update(+postId, request);
  }

  @Delete(':id')
  remove(@Param('id') postId: string) {
    return this.postsService.remove(+postId);
  }
}
