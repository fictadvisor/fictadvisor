import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/v2/security/JwtGuard';
import { Permission } from 'src/v2/security/permission-guard/Permission';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';

export function Access(permission: string, ...guards: any[]) {
  return applyDecorators(
    Permission(permission),
    UseGuards(JwtGuard, ...guards, PermissionGuard)
  );
}