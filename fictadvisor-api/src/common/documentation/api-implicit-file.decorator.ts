import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

// `@nestjs/swagger` removed the legacy `ApiImplicitFile` decorator in v11.
// This is a drop-in replacement covering the metadata the codebase uses,
// expressed via the supported `ApiConsumes` + `ApiBody` binary schema.
export interface ApiImplicitFileMetadata {
  name: string;
  description?: string;
  required?: boolean;
}

export function ApiImplicitFile (metadata: ApiImplicitFileMetadata) {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      required: metadata.required,
      schema: {
        type: 'object',
        required: metadata.required ? [metadata.name] : [],
        properties: {
          [metadata.name]: {
            type: 'string',
            format: 'binary',
            description: metadata.description,
          },
        },
      },
    }),
  );
}
