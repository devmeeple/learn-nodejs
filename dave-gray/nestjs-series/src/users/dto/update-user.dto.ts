import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * CreateUserDto 를 상속했기 때문에 유효성검사도 동일하게 적용됨
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
