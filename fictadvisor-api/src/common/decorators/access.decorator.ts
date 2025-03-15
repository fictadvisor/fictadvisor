import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/auth/jwt.guard';
import { SetPermissions } from '../guards/permission/set-permissions.meta';
import { PermissionGuard } from '../guards/permission/permission.guard';

export function Access (permissions: string | string[], ...guards: any[]) {
  return applyDecorators(
    SetPermissions(permissions),
    UseGuards(JwtGuard, ...guards, PermissionGuard),
  );
}
