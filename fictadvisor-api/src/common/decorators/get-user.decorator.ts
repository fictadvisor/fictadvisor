import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma-client/fictadvisor';

export const GetUser = createParamDecorator(
  (field: keyof Omit<User, 'password'> = null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return field ? request.user?.[field] : request.user;
  });
