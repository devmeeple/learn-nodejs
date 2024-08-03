import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AddPostRequest } from './dto/add-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  addPost(@Body() request: AddPostRequest) {
    return this.postsService.save(request);
  }

  @Get()
  findAllPost() {
    return this.postsService.findAll();
  }
}
