import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UsersModel} from './entities/users.entity';
import {Repository} from 'typeorm';
import {UsersModule} from './users.module';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersModel)
        private readonly usersRepository: Repository<UsersModule>)
    {}

    async createUser(nickname: string, email: string, password: string) {
        const user = this.usersRepository.create({
            nickname,
            email,
            password,
        });

        return await this.usersRepository.save(user);
    }

    async getAllUsers() {
        return this.usersRepository.find();
    }
}
