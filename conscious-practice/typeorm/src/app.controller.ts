import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.appService.findAll();
  }

  @Post()
  create(@Body() request: CreateUserDto): Promise<UserEntity> {
    return this.appService.create(request);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() request: UpdateUserDto) {
    return this.appService.update(+id, request);
  }

  @Post('/profile')
  creteUserAndProfile(@Body() request: CreateUserDto) {
    return this.appService.createUserAndProfile(request);
  }

  @Post('/post')
  createUserAndPost(@Body() request: CreateUserDto) {
    return this.appService.createUserAndPost(request);
  }

  @Get('/posts')
  getPostList() {
    return this.appService.getPostList();
  }

  @Post('/posts/tags')
  createPostsTags() {
    return this.appService.createPostsTags();
  }

  @Get('/tags')
  getTagList() {
    return this.appService.getTagList();
  }
}
