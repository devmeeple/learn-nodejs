import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  /**
   * 임시 사용자 배열
   * id, name, email, role
   */
  private users = [
    { id: 1, name: '테스트1', email: 'test@gmail.com', role: 'ADMIN' },
    { id: 2, name: '테스트2', email: 'test@gmail.com', role: 'INTERN' },
    { id: 3, name: '테스트3', email: 'test@gmail.com', role: 'INTERN' },
    { id: 4, name: '테스트4', email: 'test@gmail.com', role: 'INTERN' },
    { id: 5, name: '테스트5', email: 'test@gmail.com', role: 'INTERN' },
  ];

  /**
   * 전체조회
   * @param role INTERN | ENGINEER | ADMIN
   */
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rollsArray = this.users.filter((user) => user.role === role);

      if (rollsArray.length === 0) {
        throw new NotFoundException('해당하는 역할이 없습니다');
      }

      return rollsArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('해당하는 유저를 찾을 수 없습니다');
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
