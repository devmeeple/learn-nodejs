import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPost(): Post {
    return {
      author: '마틴 파울러',
      title: '리팩토링 2판',
      content: '코드 구조를 체계적으로 개선하여 효율적인 리팩터링 구현하기',
      likeCount: 0,
      commentCount: 58,
    };
  }
}
