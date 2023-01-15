import { Injectable } from '@nestjs/common';
import { PermissionGuard } from './PermissionGuard';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../api/user/UserService';

@Injectable()
export class GlobalPermissionGuard extends PermissionGuard {

  constructor(
    protected reflector: Reflector,
    protected userService: UserService,
  ) {
    super(userService, reflector);
  }

  getScope(): string {
    return 'global';
  }

}