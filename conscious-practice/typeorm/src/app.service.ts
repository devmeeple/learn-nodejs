import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
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
}
