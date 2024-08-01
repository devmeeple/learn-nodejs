import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * register: 유저를 생성하고 반환한다.
 * findByEmail: 이메일을 기준으로 유저를 조회한다.
 */

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = this.userRepository.create(registerUserDto);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `${email}에 해당하는 유저를 찾을 수 없습니다`,
      );
    }

    return user;
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    const user = await this.findByEmail(email);

    const updatedUser = {
      ...user,
      ...updateUserDto,
    };

    return this.userRepository.save(updatedUser);
  }

  async remove(email: string) {
    const result = await this.userRepository.delete({ email });

    if (result.affected === 0) {
      throw new NotFoundException(
        `${email}을 해당하는 유저를 삭제할 수 없습니다`,
      );
    }

    return result;
  }
}
