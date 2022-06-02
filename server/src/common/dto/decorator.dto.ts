import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from 'src/common/dto/user.dto';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
