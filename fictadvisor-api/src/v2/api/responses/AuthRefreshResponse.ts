import { ApiProperty } from '@nestjs/swagger';

export class AuthRefreshResponse {
  @ApiProperty()
    accessToken: string;
}