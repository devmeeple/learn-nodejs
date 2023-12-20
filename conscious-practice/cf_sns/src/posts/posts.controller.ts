import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: '테스트1',
    title: '테스트 제목1',
    content: '테스트 내용1',
    likeCount: 0,
    commentCount: 58,
  },
  {
    id: 2,
    author: '테스트2',
    title: '테스트 제목2',
    content: '테스트 내용2',
    likeCount: 0,
    commentCount: 112,
  },
  {
    id: 3,
    author: '테스트3',
    title: '테스트 제목3',
    content: '테스트 내용3',
    likeCount: 123,
    commentCount: 1132,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPostList(): PostModel[] {
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') postId: string): PostModel {
    const post = posts.find((post) => post.id === +postId);
    if (!post) {
      throw new NotFoundException('데이터를 찾을 수 없습니다');
    }
    return post;
  }

  @Post()
  create(@Body() request: CreatePostDto): PostModel {
    const post: PostModel = {
      id: posts.length + 1,
      ...request,
      likeCount: 0,
      commentCount: 0,
    };
    posts.push(post);
    return post;
  }

  @Patch(':id')
  update(
    @Param('id') postId: string,
    @Body() request: UpdatePostDto,
  ): PostModel {
    const post = this.getPost(postId);

    if (request.author) {
      post.author = request.author;
    }

    if (request.title) {
      post.author = request.title;
    }

    if (request.content) {
      post.content = request.content;
    }
    posts = posts.map((prevPost) =>
      prevPost.id === +postId ? post : prevPost,
    );

    return post;
  }

  @Delete(':id')
  remove(@Param('id') postId: string) {
    this.getPost(postId);
    posts = posts.filter((post) => post.id !== +postId);
    return postId;
  }
}
