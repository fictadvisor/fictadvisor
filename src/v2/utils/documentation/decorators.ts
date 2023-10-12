import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PERMISSION } from '../../security/PERMISSION';
import { Access } from '../../security/Access';

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

  if (permissions || guards) {
    decorators.push(Access(permissions ?? [], ...guards ?? []));
  }

  return applyDecorators(...decorators);
}
