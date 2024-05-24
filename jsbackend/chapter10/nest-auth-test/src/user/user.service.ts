import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(user: User) {
    return this.userRepository.save(user);
  }

  getUser(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async updateUser(email: string, user: User) {
    const findByUser = await this.getUser(email);

    findByUser.username = user.username;
    findByUser.password = user.password;

    await this.userRepository.save(findByUser);
  }

  deleteUser(email: string) {
    return this.userRepository.delete({ email });
  }
}
