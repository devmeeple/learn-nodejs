import { PickType } from '@nestjs/mapped-types';
import { UsersEntity } from '../../users/entities/users.entity';

export class RegisterUserDto extends PickType(UsersEntity, [
  'nickname',
  'email',
  'password',
]) {}
