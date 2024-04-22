import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  /**
   * 임시 사용자 배열
   * id, name, email, role
   */
  private users = [
    { id: 1, name: '테스트1', email: 'test@gmail.com', role: 'ADMIN' },
    { id: 2, name: '테스트2', email: 'test@gmail.com', role: 'ENGINEER' },
    { id: 3, name: '테스트3', email: 'test@gmail.com', role: 'INTERN' },
    { id: 4, name: '테스트4', email: 'test@gmail.com', role: 'INTERN' },
    { id: 5, name: '테스트5', email: 'test@gmail.com', role: 'INTER' },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
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
