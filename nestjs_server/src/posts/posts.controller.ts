import {Controller, Get, Param} from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: string;
 * commentCount: number;
 */

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
    author: 'newjeans_offial',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 1000000,
    commentCount: 999999,
  },
  {
    id: 2,
    author: 'newjeans_offial',
    title: '뉴진스 해린',
    content: '노래 연습하고 있는 해린',
    likeCount: 1000000,
    commentCount: 999999,
  },
  {
    id: 3,
    author: 'blackpink_offial',
    title: '블랙핑크 로제',
    content: '종합운동장에서 공연하는 로제',
    likeCount: 1000000,
    commentCount: 999999,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {
  }

  /**
   * 1) GET /posts
   *    모든 posts를 다 가져온다.
   *
   * 2) GET /posts/:id
   *    id에 해당되는 post를 가져온다.
   *
   *    예를 들어서 id = 1일 경우 id가 1인 포스트를 가져온다.
   *
   * 3) POST /posts
   *    POST를 생성한다.
   *
   * 4) PUT /posts/:id
   *    id에 해당되는 POST를 변경한다.
   *
   * 5) DELETE /posts/:id
   *    id에 해당되는 POST를 삭제한다.
   */

  @Get()
  getPosts() {
    return posts;
  }

  // ID 파라미터를 가져오고 id 매개변수에 저장한다.
  @Get(':id')
  getPost(@Param('id') id: string) {
    return posts.find((post) => post.id === +id);
  }
}
