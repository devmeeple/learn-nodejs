import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AddPostRequest } from './dto/add-post.dto';
import { UpdatePostRequest } from './dto/update-post.dto';

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

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() request: UpdatePostRequest) {
    return this.postsService.update(id, request);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.postsService.delete(id);
  }
}
