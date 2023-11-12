import { ApiProperty } from '@nestjs/swagger';

export class CheckPermissionsResponse {
    @ApiProperty({
      description: 'Permissions with statuses',
    })
      additionalProp: boolean;
}