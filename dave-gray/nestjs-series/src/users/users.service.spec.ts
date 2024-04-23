import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // 임시 데이터

  describe('[findAll] 전체조회', () => {
    it('5명의 유저가 전체조회된다', () => {
      // given

      // when
      const act = service.findAll();

      // then
      expect(act.length).toBe(5);
    });

    it('role 에 해당하는 유저가 조회된다', () => {
      // when
      const act = service.findAll('INTERN');

      // then
      expect(act.length).toBe(4);
    });

    it('role 에 해당하는 유저가 조회되지 않으면 에러가 발생한다', () => {
      // given
      const role = 'ENGINEER';

      // when + then
      expect(() => service.findAll(role)).toThrowError();
    });
  });

  describe('[fineOne] 단건조회', () => {
    it('단건조회 결과 유저정보를 반환한다', () => {
      // given
      const id = 1;
      const name = '테스트1';

      // when
      const act = service.findOne(1);

      // then
      expect(act.id).toEqual(1);
      expect(act.name).toEqual('테스트1');
    });

    it('존재하지 않는 유저를 조회하면 에러가 발생한다', () => {
      // given

      // then
      expect(() => service.findOne(100)).toThrowError();
    });
  });

  describe('[create] 유저 추가', () => {
    it('추가한 유저의 정보를 반환한다', () => {
      // given
      const createUserDto: CreateUserDto = {
        name: '테스트6',
        email: 'test@gmail.com',
        role: 'ADMIN',
      };

      // when
      const act = service.create(createUserDto);

      // then
      expect(act.name).toEqual('테스트6');
      expect(act.email).toEqual('test@gmail.com');
      expect(act.role).toEqual('ADMIN');
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
      const id = 1;

      // when
      const act = service.delete(id);

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
