import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './update-user.dto';
import { validate } from 'class-validator';

describe('UpdateUserDto', () => {
  it('올바른 입력이 주어지면 유효성 검사를 통과한다', async () => {
    // given
    const request = {
      username: 'new!username',
      password: 'new!password123!',
    };

    // when
    const updateUserDto = plainToClass(UpdateUserDto, request);
    const sut = await validate(updateUserDto);

    // then
    expect(sut.length).toEqual(0);
  });

  it('이름이 문자열이 아니면 유효성 검사에 실패한다', async () => {
    // given
    const invalidRequest = {
      username: 123,
      password: 'validapassword',
    };

    // when
    const updateUserDto = plainToClass(UpdateUserDto, invalidRequest);
    const sut = await validate(updateUserDto);

    // then
    expect(sut.length).toEqual(1);
    expect(sut[0].property).toEqual('username');

    // TODO: 2024.08.01 isString 일반화 시키기
    expect(sut[0].constraints).toEqual({
      isString: 'username must be a string',
    });
  });
});
