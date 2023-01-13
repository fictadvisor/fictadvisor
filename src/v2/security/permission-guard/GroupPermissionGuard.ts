import { ExecutionContext, Injectable } from '@nestjs/common';
import { PermissionGuard } from './PermissionGuard';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../api/user/UserService';
import { Group } from '@prisma/client';

@Injectable()
export class GroupPermissionGuard extends PermissionGuard {

  constructor(
    protected reflector: Reflector,
    protected userService: UserService,
  ) {
    super(userService, reflector);
  }

  getScope(context: ExecutionContext): string {
    const group = context.switchToHttp().getRequest().group as Group;
    return group.id;
  }

}