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

  async getUser(email: string) {
    const findByUser = await this.userRepository.findOne({
      where: { email },
    });
    return findByUser;
  }

  async updateUser(email: string, user: User) {
    const findByUser = await this.getUser(email);
    console.log(findByUser);

    findByUser.username = user.username;
    findByUser.password = user.password;

    console.log(findByUser);
    await this.userRepository.save(findByUser);
  }

  deleteUser(email: string) {
    return this.userRepository.delete({ email });
  }
}
