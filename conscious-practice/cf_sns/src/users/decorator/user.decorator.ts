import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersEntity } from '../entities/users.entity';

export const User = createParamDecorator(
  (data: keyof UsersEntity | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UsersEntity;

    if (!user) {
      throw new InternalServerErrorException(
        '요청객체에 user 프로퍼티가 존재하지 않습니다',
      );
    }

    if (data) {
      return user[data];
    }

    return user;
  },
);
