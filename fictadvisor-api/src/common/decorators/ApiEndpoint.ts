import { JwtGuard } from '../guards/auth/JwtGuard';
import { SetPermissions } from '../guards/permission/SetPermissions';
import { SetMultipleAccess } from '../guards/multiple-access/SetMultipleAccess';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { MultipleAccessGuard } from '../guards/multiple-access/MultipleAccessGuard';
import { PermissionGuard } from '../guards/permission/PermissionGuard';
import { TelegramGuard } from '../guards/telegram/TelegramGuard';
import { ApiEndpointParams } from '../documentation/types/ApiEndpointParams';
import { getDocumentationDecorators } from '../documentation/getDocumentationDecorators';

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
