import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiBodyOptions,
  ApiConflictResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiParamOptions,
  ApiPayloadTooLargeResponse,
  ApiQuery,
  ApiQueryOptions,
  ApiResponseOptions, ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { PERMISSION } from '@fictadvisor/utils/security';
import { JwtGuard } from '../../security/JwtGuard';
import { PermissionGuard } from '../../security/permission-guard/PermissionGuard';
import { Permissions } from '../../security/permission-guard/Permissions';
import { MultipleAccesses } from 'src/v2/security/multiple-access-guard/MultipleAccesses';
import { TelegramGuard } from 'src/v2/security/TelegramGuard';
import { MultipleAccessGuard } from 'src/v2/security/multiple-access-guard/MultipleAccessGuard';
import { ApiImplicitFile, ApiImplicitFileMetadata } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { User } from '@prisma/client';

export class ApiDocumentationParams {
  isAuth?: boolean;
  ok?:  ApiResponseOptions;
  body?: ApiBodyOptions;
  badRequest?: ApiResponseOptions;
  forbidden?: ApiResponseOptions;
  unauthorized?: ApiResponseOptions;
  unsupportedMediaType?: ApiResponseOptions;
  implicitFile?:  ApiImplicitFileMetadata;
  payloadTooLarge?: ApiResponseOptions;
  conflict?: ApiResponseOptions;
  tooManyRequests?: ApiResponseOptions;
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
}

export class ApiEndpointParams {
  summary: string;
  permissions?: PERMISSION | PERMISSION[];
  guards?: any | any[];
  documentation? : ApiDocumentationParams;
}

function addDocumentationDecorators (summary: string, description: string, documentation?: ApiDocumentationParams) {
  const responseTypes = [
    { key: 'ok', decorator: ApiOkResponse },
    { key: 'badRequest', decorator: ApiBadRequestResponse },
    { key: 'forbidden', decorator: ApiForbiddenResponse },
    { key: 'unauthorized', decorator: ApiUnauthorizedResponse },
    { key: 'unsupportedMediaType', decorator: ApiUnsupportedMediaTypeResponse },
    { key: 'implicitFile', decorator: ApiImplicitFile },
    { key: 'payloadTooLarge', decorator: ApiPayloadTooLargeResponse },
    { key: 'conflict', decorator: ApiConflictResponse },
    { key: 'tooManyRequests', decorator: ApiTooManyRequestsResponse },
  ];

  const decorators = [
    ApiOperation({ summary, description }),
    ...(documentation?.isAuth ? [ApiBearerAuth()] : []),
  ];

  decorators.push(
    ...responseTypes
      .filter((responseType) => documentation?.[responseType.key])
      .map((responseType) => responseType.decorator(documentation[responseType.key]))
  );

  if (documentation?.params) {
    decorators.push(
      ...documentation.params.map((query) => ApiParam(query))
    );
  }

  if (documentation?.queries) {
    decorators.push(
      ...documentation.queries.map((query) => ApiQuery(query))
    );
  }

  if (documentation?.body) {
    decorators.push(ApiBody(documentation.body));
  }

  return decorators;
}

export function ApiEndpoint ({ summary, permissions, guards, documentation }: ApiEndpointParams) {
  let description = '';

  if (permissions)
    description += `<b>Permissions: ${typeof permissions === 'string' ? permissions : permissions.join(', ')}</b><br>`;
  if (guards) {
    description += `<b>Guards: ${typeof guards === 'function' ? guards.name : guards.map((g) => g.name).join(', ')}</b>`;
    guards = typeof guards === 'function' ? [guards] : guards;
  }

  const decorators = addDocumentationDecorators(summary, description, documentation);

  if (permissions && guards?.map((g) => g.name).includes('TelegramGuard')) {
    const accessGuards = [JwtGuard, TelegramGuard];
    const filteredGuards = guards.filter((g) => g.name !== 'TelegramGuard');
    decorators.push(
      Permissions(permissions),
      MultipleAccesses(...accessGuards),
      UseGuards(MultipleAccessGuard, ...filteredGuards, PermissionGuard),
    );
    return applyDecorators(...decorators);
  }

  if (guards) {
    decorators.push(UseGuards(...guards));
  }

  if (permissions) {
    decorators.unshift(
      Permissions(permissions),
      UseGuards(JwtGuard),
    );
    decorators.push(
      UseGuards(PermissionGuard),
    );
  }

  return applyDecorators(...decorators);
}

export const GetUser = createParamDecorator(
  (field: keyof Omit<User, 'password'> = null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return field ? request.user?.[field] : request.user;
  });
