import { ApiProperty } from '@nestjs/swagger';

export class IsRegisteredResponse {
  @ApiProperty({
    description: 'Indicates whether the queried user is registered',
  })
    isRegistered: boolean;
}
