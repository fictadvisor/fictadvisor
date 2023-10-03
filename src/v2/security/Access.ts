import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/v2/security/JwtGuard';
import { Permissions } from 'src/v2/security/permission-guard/Permissions';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';
import { ApiOperation } from '@nestjs/swagger';

export function Access (permissions: string | string[], ...guards: any[]) {
  let description = `<b>Permissions: ${typeof permissions === 'string' ? permissions : permissions.join(', ')}</b>`;
  if (guards.length) description += `<br><b>Guards: ${guards.map((g) => g.name).join(', ')}</b>`;
  return applyDecorators(
    Permissions(permissions),
    UseGuards(JwtGuard, ...guards, PermissionGuard),
    ApiOperation({ description }),
  );
}
