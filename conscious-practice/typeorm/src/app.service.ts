import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileEntity } from './entities/profile.entity';
import { PostEntity } from './entities/post.entity';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      relations: { profile: true, posts: true },
    });
  }

  async create(request: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(request);
    return this.userRepository.save(user);
  }

  async update(id: number, request: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return this.userRepository.save({
      ...user,
      ...request,
    });
  }

  async createUserAndProfile(request: CreateUserDto) {
    const user = await this.userRepository.save({
      ...request,
    });

    await this.profileRepository.save({
      user,
      ...request,
    });

    return user;
  }

  async createUserAndPost(request: CreateUserDto) {
    const user = await this.userRepository.save({
      ...request,
    });
    await this.postRepository.save({
      author: user,
      title: request.title,
    });
  }

  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: '안녕하세요 1',
    });

    const post2 = await this.postRepository.save({
      title: '안녕하세요 2',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    await this.postRepository.save({
      title: '태그를 포함한 포스트',
      tags: [tag1, tag2],
    });
  }

  async getPostList() {
    return await this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  async getTagList() {
    return await this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
