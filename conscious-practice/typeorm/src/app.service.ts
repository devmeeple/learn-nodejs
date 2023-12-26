import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileEntity } from './entities/profile.entity';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
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
}
