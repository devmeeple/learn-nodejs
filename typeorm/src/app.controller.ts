import {Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Role, UserModel} from './entity/user.entity';
import {
  Between,
  Equal,
  ILike, In, IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import {ProfileModel} from './entity/profile.entity';
import {PostModel} from './entity/post.entity';
import {TagModel} from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
      @InjectRepository(UserModel)
      private readonly userRepository: Repository<UserModel>,
      @InjectRepository(ProfileModel)
      private readonly  profileRepository: Repository<ProfileModel>,
      @InjectRepository(PostModel)
      private readonly  postRepository: Repository<PostModel>,
      @InjectRepository(TagModel)
      private readonly  tagRepository: Repository<TagModel>,
  ) {
  }

  @Post('sample')
  async sample() {
    // 모델에 해당되는 객체 생성 - 저장은 안함
    // const user1 = this.userRepository.create({
    //   email: 'test@meeple.com',
    // });

    // 저장
    // const user2 = await this.userRepository.save({
    //   email: 'test@meeple.com',
    // });

    // preload
    // 입력된 값을 기반으로 데이터베이스에 있는 데이터를 불러오고
    // 추가 입력된 값으로 데이터베이스에서 가져온 값들을 대체함.
    // 저장하지는 않음.
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'meeple@meeple.com',
    // });

    // 삭제하기
    // await this.userRepository.delete(101);

    // 값을 증가시킴
    // await this.userRepository.increment({
    //   id: 3,
    // }, 'count', 100);

    // 값을 감소시킴
    // await this.userRepository.decrement({
    //   id: 1,
    // }, 'count', 1);

    // 갯수 카운팅하기
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });

    // sum
    // const sum = await this.userRepository.sum('count', {
    //   id: LessThan(4),
    // });

    // average
    // const average = await this.userRepository.average('count', {
    //   id: LessThan(4),
    // });

    // 최소값
    // const min = await this.userRepository.minimum('count', {
    //   id: LessThan(4),
    // });

    // 최대값
    // const max = await this.userRepository.maximum('count', {
    //   id: LessThan(4),
    // });

    // const users = await this.userRepository.find({
    //
    // });

    // const userOne = await this.userRepository.findOne({
    //   where: {
    //     id: 3,
    //   },
    // });

    const usersAndCount = await this.userRepository.findAndCount({
      take: 3,
    });

    return usersAndCount;
  }

  @Post('users')
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      order: {
        id: 'ASC',
      },
      where: {
        // 아닌 경우 가져오기
        // id: Not(1),
        // id: LessThan(30),
        // 적은경우 or 같은경우
        // id: LessThanOrEqual(30),
        // 많은경우
        // id: MoreThan(30),
        // 많거나 같은경우
        // id: MoreThanOrEqual(30),
        // 같은경우
        // id: Equal(30),
        // 유사값
        // email: Like('%GOOGLE%'),
        // 대문자 소문자 구분안하는 유사값
        // email: ILike('%GOOGLE%'),
        // 사이값
        // id: Between(10, 15),
        // 해당되는 여러개의 값
        // id: In([1, 3, 5, 7, 99]),
        // ID가 null인경우 가져오기
        // id: IsNull(),
      },

      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다.
      // 만약에 select를 정의하지 않으면
      // select를 정의하면 정의된 프로퍼티들만 가져오게 된다.
      // select: {
      //   id: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   version: true,
      //   profile: {
      //     id: true,
      //   }
      // },
      // 필터링할 조건을 입력하게 된다.
      // 관계를 가져오는법
      // relations: {
      //   profile: true,
      // },
      // 오름차 내림차
      // ASC
      // DESC
      // order: {
      //   id: 'DESC',
      // },
      // 처음 몇개를 제외할지,
      // skip: 0,
      // take: 2,
    });
  }

  @Patch('users/:id')
  async patchUsers(
      @Param('id') id: string,
  ) {
    const user = await this.userRepository.findOne({
      where:{
        id: parseInt(id),
      }
    });

    return this.userRepository.save({
      ...user,
      email: user.email + '0',
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@meeple.com',
      profile: {
        profileImg: 'asdf.jpg',
      }
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user,
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postuser@meeple.com',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'Programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations:{
        tags: true,
      }
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
