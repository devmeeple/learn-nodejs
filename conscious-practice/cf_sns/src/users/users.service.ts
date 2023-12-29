import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  /**
   * 닉네임 중복확인
   * @param createUserDto
   */
  async createUser(createUserDto: CreateUserDto) {
    const nicknameExists = await this.userRepository.exist({
      where: {
        nickname: createUserDto.nickname,
      },
    });

    if (nicknameExists) {
      throw new BadRequestException('이미 존재하는 닉네임입니다.');
    }

    const emailExists = await this.userRepository.exist({
      where: {
        email: createUserDto.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
