import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  findOnePost(@Param('id') id: number) {
    return this.postsService.findById(id);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.postsService.delete(id);
  }
}
