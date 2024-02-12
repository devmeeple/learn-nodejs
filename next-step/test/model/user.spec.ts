import { User } from '../../src/model/user';

describe('User', () => {
  it('User 클래스를 정의하고 아이디, 비밀번호, 이름, 이메일을 저장한다', () => {
    // given
    const user = new User('javajigi', 'password', 'jaesung', 'javajigi@slipp.net');

    // then
    expect(user.userId).toEqual('javajigi');
    expect(user.password).toEqual('password');
    expect(user.name).toEqual('jaesung');
    expect(user.email).toEqual('javajigi@slipp.net');
  });
});