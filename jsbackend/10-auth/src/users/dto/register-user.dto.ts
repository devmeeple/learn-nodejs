import { IsEmail, IsString } from 'class-validator';
import { emailValidationMessage } from '../../common/validation-message/email-validation.message';
import { stringValidationMessage } from '../../common/validation-message/string-validation.message';

export class RegisterUserDto {
  @IsEmail({}, { message: emailValidationMessage })
  email: string;

  @IsString({ message: stringValidationMessage })
  username: string;

  @IsString({ message: stringValidationMessage })
  password: string;
}
