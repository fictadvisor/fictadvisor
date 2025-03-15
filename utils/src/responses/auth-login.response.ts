import { ApiProperty } from '@nestjs/swagger';
import { AuthRefreshResponse } from './auth-refresh.response';

export class AuthLoginResponse extends AuthRefreshResponse {
  @ApiProperty({
    description: 'Refresh token to obtain new access token',
  })
    refreshToken: string;
}
