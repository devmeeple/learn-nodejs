import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      relations: { profile: true },
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
}
