import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // 임시 데이터

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[findAll] 전체조회', () => {
    it('전체조회 결과를 반환한다', () => {
      // given
      const users = [
        { id: 1, name: '테스트1', email: 'test@gmail.com', role: 'ADMIN' },
        { id: 2, name: '테스트2', email: 'test@gmail.com', role: 'ENGINEER' },
        { id: 3, name: '테스트3', email: 'test@gmail.com', role: 'INTERN' },
        { id: 4, name: '테스트4', email: 'test@gmail.com', role: 'INTERN' },
        { id: 5, name: '테스트5', email: 'test@gmail.com', role: 'INTER' },
      ];

      // when
      const act = service.findAll();

      // then
      expect(act.length).toBe(5);
      expect(act).toEqual(users);
    });
  });

  describe('[fineOne] 단건조회', () => {
    it('단건조회 결과 유저정보를 반환한다', () => {
      // given
      const user = {
        id: 1,
        name: '테스트1',
        email: 'test@gmail.com',
        role: 'ADMIN',
      };

      // when
      const act = service.findOne(1);

      // then
      expect(act).toEqual(user);
    });
  });

  it('[create] 유저 추가', () => {
    type role = 'ADMIN' | 'ENGINEER' | 'INTERN';
    // given
    const user = {
      name: '테스트 유저1',
      email: 'test@gmail.com',
      role: 'ADMIN' as role,
    };

    // when
    const act = service.create(user);

    // then
    expect(act).toEqual({
      id: 6,
      ...user,
    });
  });

  describe('[update] 유저 정보 업데이트', () => {
    it('업데이트된 유저 정보를 반환한다', () => {
      // given
      const updatedUser = { name: '업데이트 테스트' };

      // when
      const act = service.update(1, updatedUser);

      // then
      expect(act).toEqual({
        id: 1,
        name: '업데이트 테스트',
        email: 'test@gmail.com',
        role: 'ADMIN',
      });
    });
  });

  describe('[delete] 유저 삭제', () => {
    it('삭제한 유저 정보를 반환한다', () => {
      // given

      // when
      const act = service.delete(1);

      // then
      expect(act).toEqual({
        id: 1,
        name: '테스트1',
        email: 'test@gmail.com',
        role: 'ADMIN',
      });
    });
  });
});
