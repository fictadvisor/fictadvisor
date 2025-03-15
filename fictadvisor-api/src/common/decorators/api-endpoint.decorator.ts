import { JwtGuard } from '../guards/auth/jwt.guard';
import { SetPermissions } from '../guards/permission/v2/set-permissions.meta';
import { SetMultipleAccess } from '../guards/multiple-access/set-multiple-access.meta';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { MultipleAccessGuard } from '../guards/multiple-access/multiple-access.guard';
import { PermissionGuard } from '../guards/permission/v2/permission.guard';
import { TelegramGuard } from '../guards/telegram/telegram.guard';
import { ApiEndpointParams } from '../documentation/types/api-endpoint-params.type';
import { getDocumentationDecorators } from '../documentation/get-documentation-decorators';

export function ApiEndpoint ({ summary, permissions, guards, documentation }: ApiEndpointParams) {
  let description = '';

  if (permissions)
    description += `<b>Permissions: ${typeof permissions === 'string' ? permissions : permissions.join(', ')}</b><br>`;
  if (guards) {
    description += `<b>Guards: ${typeof guards === 'function' ? guards.name : guards.map((g) => g.name).join(', ')}</b>`;
    guards = typeof guards === 'function' ? [guards] : guards;
  }

  const decorators = getDocumentationDecorators(summary, description, documentation);

  if (permissions && guards?.map((g) => g.name).includes('TelegramGuard')) {
    const accessGuards = [JwtGuard, TelegramGuard];
    const filteredGuards = guards.filter((g) => g.name !== 'TelegramGuard');
    decorators.push(
      SetPermissions(permissions),
      SetMultipleAccess(...accessGuards),
      UseGuards(MultipleAccessGuard, ...filteredGuards, PermissionGuard),
    );
    return applyDecorators(...decorators);
  }

  if (guards) {
    decorators.push(UseGuards(...guards));
  }

  if (permissions) {
    decorators.unshift(
      SetPermissions(permissions),
      UseGuards(JwtGuard),
    );
    decorators.push(
      UseGuards(PermissionGuard),
    );
  }

  return applyDecorators(...decorators);
}
