import { ApiBodyOptions, ApiParamOptions, ApiQueryOptions, ApiResponseOptions } from '@nestjs/swagger';
import { ApiImplicitFileMetadata } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

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
};
