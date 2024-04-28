import { ApiProperty } from '@nestjs/swagger';
import { AuthRefreshResponse } from './AuthRefreshResponse';

export class AuthLoginResponse extends AuthRefreshResponse {
  @ApiProperty({
    description: 'Refresh token to obtain new access token',
  })
    refreshToken: string;
}