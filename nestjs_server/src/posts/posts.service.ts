import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {PostsModel} from './entities/posts.entity';
import {InjectRepository} from '@nestjs/typeorm';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: string;
 * commentCount: number;
 */

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

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostsModel)
        private readonly postsRepository: Repository<PostsModel>
    ) {
    }
    async getAllPosts() {
        return this.postsRepository.find(); // 다수의 데이터를 가져올 때 사용
    }

    async getPostById(id: number) {
        const post =  await this.postsRepository.findOne({
            where: {
                id,
            },

        });

        if (!post) {
            throw new NotFoundException();
        }

        return post;
    }

    async createPost(authorId: number, title: string, content: string) {
        // 1) create -> 저장할 객체를 생성한다.
        // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)

        // 비동기가 아닌 동기로 이루어짐(객체를 생성하기만 하기 때문에) 따라서 await 안해도 괜찮다.
        const post = this.postsRepository.create({
            author: {
                id: authorId,
            },
            title,
            content,
            likeCount: 0,
            commentCount: 0,
        });

        return await this.postsRepository.save(post);
    }

    async updatePost(postId: number, title: string, content: string) {
        // save의 기능
        // 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
        // 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트 한다.

        const post = await this.postsRepository.findOne({
            where: {
                id: postId,
            },
        });

        if (!post) {
            throw new NotFoundException();
        }

        if (title) {
            post.title = title;
        }

        if (content) {
            post.content = content;
        }

        return await this.postsRepository.save(post);
    }

    async deletePost(postId: number) {
        const post = await this.postsRepository.findOne({
            where: {
                id: postId,
            },
        });

        // 글이 없으면 기본제공 에러 반환(404)
        if (!post) {
            throw new NotFoundException();
        }

        await this.postsRepository.delete(postId);

        return postId;
    }
}
