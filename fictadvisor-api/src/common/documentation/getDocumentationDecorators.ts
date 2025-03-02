import {
  ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse, ApiOperation, ApiParam, ApiPayloadTooLargeResponse, ApiQuery, ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { ApiDocumentationParams } from './types/ApiDocumentationParams';

export function getDocumentationDecorators (summary: string, description: string, documentation?: ApiDocumentationParams) {
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
