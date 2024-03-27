import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PERMISSION } from '@fictadvisor/utils/security';
import { JwtGuard } from '../../security/JwtGuard';
import { PermissionGuard } from '../../security/permission-guard/PermissionGuard';
import { Permissions } from '../../security/permission-guard/Permissions';
import { MultipleAccesses } from 'src/v2/security/multiple-access-guard/MultipleAccesses';
import { TelegramGuard } from 'src/v2/security/TelegramGuard';
import { MultipleAccessGuard } from 'src/v2/security/multiple-access-guard/MultipleAccessGuard';

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

  if (permissions && guards?.map((g) => g.name).includes('TelegramGuard')) {
    const accessGuards = [JwtGuard, TelegramGuard];
    const filteredGuards = guards.filter((g) => g.name != 'TelegramGuard');
    decorators.push(
      Permissions(permissions),
      MultipleAccesses(...accessGuards),
      UseGuards(MultipleAccessGuard, PermissionGuard, ...filteredGuards),
    );
    return applyDecorators(...decorators);
  }

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
