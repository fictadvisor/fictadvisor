import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PERMISSION } from '../../security/PERMISSION';
import { JwtGuard } from '../../security/JwtGuard';
import { PermissionGuard } from '../../security/permission-guard/PermissionGuard';
import { Permissions } from '../../security/permission-guard/Permissions';

export class ApiEndpointParams {
  summary: string;
  permissions?: PERMISSION | PERMISSION[];
  guards?: any | any[];
}

export function ApiEndpoint ({ summary, permissions, guards }: ApiEndpointParams) {
  let description = '';

  if (permissions) 
    description += `<b>Permissions: ${typeof permissions === 'string' ? permissions : permissions.join(', ')}</b><br>`;
  if (guards) {
    description += `<b>Guards: ${typeof guards === 'function' ? guards.name : guards.map((g) => g.name).join(', ')}</b>`;
    guards = typeof guards === 'function' ? [guards] : guards;
  }

  const decorators = [ApiOperation({ summary, description })];

  if (permissions) {
    decorators.push(
      Permissions(permissions),
      UseGuards(JwtGuard, PermissionGuard),
    );
  }

  if (guards) {
    decorators.push(UseGuards(...guards));
  }

  return applyDecorators(...decorators);
}
