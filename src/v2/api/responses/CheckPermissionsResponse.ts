import { ApiProperty } from '@nestjs/swagger';

export class CheckPermissionsResponse {
    @ApiProperty({
      type: 'object',
      additionalProperties: {
        type: 'boolean',
      },
    })
      result: Map<string, boolean>;
}