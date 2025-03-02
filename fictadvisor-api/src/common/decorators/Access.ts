import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/auth/JwtGuard';
import { SetPermissions } from '../guards/permission/SetPermissions';
import { PermissionGuard } from '../guards/permission/PermissionGuard';

export function Access (permissions: string | string[], ...guards: any[]) {
  return applyDecorators(
    SetPermissions(permissions),
    UseGuards(JwtGuard, ...guards, PermissionGuard),
  );
}
