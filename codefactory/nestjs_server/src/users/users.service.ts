import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UsersModel} from './entities/users.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersModel)
        private readonly usersRepository: Repository<UsersModel>)
    {}

    async createUser(user: Pick<UsersModel, 'nickname' | 'email' | 'password'>) {
        /**
         * 1) nickname 중복이 없는지 확인
         * exist() -> 만약에 조건에 해당되는 값이 있으면 true 반환
         */
        const nicknameExist = await this.usersRepository.exist({
            where: {
                nickname: user.nickname,
            },
        });

        if (nicknameExist) {
            throw new BadRequestException('이미 존재하는 닉네임 입니다!');
        }

        const emailExist = await this.usersRepository.exist({
            where: {
                email: user.email,
            },
        });

        if (emailExist) {
            throw new BadRequestException('이미 가입한 이메일 입니다!');
        }

        const userObject = this.usersRepository.create({
            nickname: user.nickname,
            email: user.email,
            password: user.password,
        });

        return await this.usersRepository.save(userObject);
    }

    async getAllUsers() {
        return this.usersRepository.find();
    }

    async getUserByEmail(email: string) {
        return this.usersRepository.findOne({
            where: {
                email,
            },
        });
    }
}