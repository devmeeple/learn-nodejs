import { IsEmail, IsString } from 'class-validator';
import { isEmailMessage } from '../../common/error/validation-message';

export class RegisterUserDto {
  @IsEmail({}, { message: isEmailMessage })
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
