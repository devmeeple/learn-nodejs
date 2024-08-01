import { plainToClass } from 'class-transformer';
import { RegisterUserDto } from './register-user.dto';
import { validate } from 'class-validator';

describe('RegisterUserDto', () => {
  it('올바른 입력이 주어지면 유효성 검사를 통과한다', async () => {
    // given
    const request = {
      email: 'test@exmaple.com',
      username: 'test',
      password: 'password123!',
    };

    // when
    const registerUserDto = plainToClass(RegisterUserDto, request);
    const sut = await validate(registerUserDto);

    // then
    expect(sut.length).toBe(0);
  });

  it('잘못된 이메일이 주어지면 유휴성 검사에 실패한다', async () => {
    // given
    const invalidRequest = {
      email: 'bad',
      username: 'test',
      password: 'password123!',
    };

    // when
    const registerUserDto = plainToClass(RegisterUserDto, invalidRequest);
    const sut = await validate(registerUserDto);

    // then
    expect(sut.length).toEqual(1);
    expect(sut[0].property).toEqual('email');
    expect(sut[0].constraints).toEqual({
      isEmail: 'email 이메일 형식을 입력하세요',
    });
  });

  it('필수 필드를 누락하면 유효성 검사에 실패한다', async () => {
    // given
    const incompleteRequest = {
      email: 'test@example.com',
    };

    // when
    const registerUserDto = plainToClass(RegisterUserDto, incompleteRequest);
    const sut = await validate(registerUserDto);

    // then
    expect(sut.length).toEqual(2);
    expect(sut.map((error) => error.property)).toEqual(
      expect.arrayContaining(['username', 'password']),
    );
  });
});
