import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

// 업데이트 유효성 검증
export class UpdateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
