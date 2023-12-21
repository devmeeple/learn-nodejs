import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export interface PostModel {
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

@Injectable()
export class PostsService {
  findAll(): PostModel[] {
    return posts;
  }

  findById(id: number): PostModel {
    const post = posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }
    return post;
  }

  create(request: CreatePostDto): PostModel {
    const post: PostModel = {
      id: posts.length + 1,
      ...request,
      likeCount: 0,
      commentCount: 0,
    };
    posts.push(post);
    return post;
  }

  update(id: number, request: UpdatePostDto): PostModel {
    const post = this.findById(id);

    if (request.author) post.author = request.author;
    if (request.title) post.title = request.title;
    if (request.content) post.content = request.content;

    posts = posts.map((prevPost) => (prevPost.id === id ? post : prevPost));

    return post;
  }

  remove(id: number): string {
    this.findById(id);
    posts = posts.filter((post) => post.id !== +id);
    return `${id}번 게시물이 삭제되었습니다.`;
  }
}
