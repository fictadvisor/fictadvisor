import { ApiProperty } from '@nestjs/swagger';

export class IsAvailableResponse {
  @ApiProperty({
    description: 'Indicates whether the token is available or not',
  })
    isAvailable: boolean;
}

export class IsRegisteredResponse {
  @ApiProperty({
    description: 'Indicates whether the telegram with token is registered or not',
  })
    isRegistered: boolean;
}