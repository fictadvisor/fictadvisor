import { ApiProperty } from '@nestjs/swagger';
import { PERMISSION } from '../security';

export class CheckPermissionsResponse {
    @ApiProperty({
      description: 'Permissions with statuses',
      type: 'object',
      additionalProperties: { type: 'boolean' },
      example: {
        [PERMISSION.ADMIN_PANEL_TEACHERS_SHOW]: false,
      },
    })
      permissions: {
        [key in PERMISSION]: boolean;
      };
}
