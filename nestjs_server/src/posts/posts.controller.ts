import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
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
    const post =  posts.find((post) => post.id === +id); // 쿼리스트링 타입 변환

    // 글이 없으면 기본제공 에러 반환(404)
    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  @Post()
  postPosts(
      @Body('author') author: string,
      @Body('title') title: string,
      @Body('content') content: string,
  ) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      // key : value 형식으로 표현 값이 같을 때 축약해서 가능
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    // 기존데이터를 넣기 위해 spread operator(...)를 사용, 새로운 데이터 추가 / 불변성 유지
    posts = [
        ...posts,
        post,
    ];

    return post;
  }

  @Put(':id')
  putPost(
      @Param('id') id: string,
      @Body('author') author?: string,
      @Body('title') title?: string,
      @Body('content') content?: string
  ) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => prevPost.id === +id ? post : prevPost);

    return post;
  }

  @Delete(':id')
  deletePost(
      @Param('id') id: string
  ) {
    const post =  posts.find((post) => post.id === +id); // 쿼리스트링 타입 변환

    // 글이 없으면 기본제공 에러 반환(404)
    if (!post) {
      throw new NotFoundException();
    }

    // id를 제외한 포스트만을 추가하기 위해 !== 를 사용, ===를 사용하면 일치하는 포스트만 남기고 다 사라짐. (의도대로 동작하지 않음 따라서 !==)
    posts = posts.filter((post) => post.id !== +id);

    return id;
  }

}
