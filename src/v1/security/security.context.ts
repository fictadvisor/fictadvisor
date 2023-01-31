import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { type User } from 'src/v1/database/entities/user.entity';

export class SecurityContext {
  user?: User;
}

export const Context = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SecurityContext => {
    const req = ctx.switchToHttp().getRequest();
    const context = new SecurityContext();

    context.user = req.user ?? null;

    return context;
  }
);
