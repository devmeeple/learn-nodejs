import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

describe('User', () => {
  let repository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(async () => {
    await repository.clear();
  });

  afterAll(async () => {
    await repository.manager.connection.destroy();
  });

  it('유저를 추가한다', async () => {
    // given
    const user = {
      email: 'trudie_sitesk@earth.toh',
      password: 'RoxS5YUy1AhENsid',
      username: 'Gifford',
    };

    // when
    const sut = await repository.save(user);

    // then
    expect(sut.id).toBeDefined();
    expect(sut.email).toBe('trudie_sitesk@earth.toh');
    expect(sut.password).toBe('RoxS5YUy1AhENsid');
    expect(sut.username).toBe('Gifford');
    // 직관적이지 않은 시간 UTC 시간 표기
    expect(sut.createdDt).toBeDefined();
  });
});
