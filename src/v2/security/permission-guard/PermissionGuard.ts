import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';
import { RequestUtils } from '../../utils/RequestUtils';
import { PermissionService } from '../../api/services/PermissionService';

@Injectable()
export class PermissionGuard implements CanActivate {

  private request: Request;

  constructor (
    private permissionService: PermissionService,
    private reflector: Reflector,
  ) {}

  async canActivate (context: ExecutionContext) {
    this.request = context.switchToHttp().getRequest<Request>();
    const user: User = this.request.user as User;
    const permissions = this.getPermissions(context);

    for (const permission of permissions) {
      const hasPermission = await this.permissionService.hasPermission(user.id, permission);

      if (!hasPermission) {
        throw new NoPermissionException();
      }
    }

    return true;
  }

  getPermissions (context: ExecutionContext): string[] {
    const permissions = this.reflector.get('permissions', context.getHandler());
    return permissions.map((permission) => this.getPermission(permission));
  }

  getPermission (permission: string): string {
    return permission
      .split('.')
      .map((part) => this.getPart(part))
      .join('.');
  }

  getPart (part: string): string {
    if (part.startsWith('$')) {
      const newPart = RequestUtils.get(this.request, part.slice(1));
      if (!newPart) {
        throw new NoPermissionException();
      }
      return newPart;
    }

    return part;
  }

}