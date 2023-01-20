import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from '../../api/user/UserService';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';

export abstract class PermissionGuard implements CanActivate {

  protected userService: UserService;
  protected reflector: Reflector;

  protected constructor(
    userService: UserService,
    reflector: Reflector,
  ) {
    this.userService = userService;
    this.reflector = reflector;
  }

  async canActivate(context: ExecutionContext) {
    const user: User = context.switchToHttp().getRequest<Request>().user as User;
    const permission = this.reflector.get('permission', context.getHandler);
    const dbScope = this.getScope(context);
    const hasPermission = await this.userService.hasPermission(user, permission, dbScope);

    if (!hasPermission) {
      throw new NoPermissionException();
    }

    return true;
  }

  abstract getScope(context: ExecutionContext): string;

}