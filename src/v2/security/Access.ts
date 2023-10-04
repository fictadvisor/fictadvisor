import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/v2/security/JwtGuard';
import { Permissions } from 'src/v2/security/permission-guard/Permissions';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';

export function Access (permissions: string | string[], ...guards: any[]) {
  return applyDecorators(
    Permissions(permissions),
    UseGuards(JwtGuard, ...guards, PermissionGuard),
  );
}
