import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

export const GetCookie = createParamDecorator(
  (data, ctx: ExecutionContext): { refreshToken?: string } => {
    const req = ctx.switchToHttp().getRequest();
    return req.cookies;
  },
);

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
