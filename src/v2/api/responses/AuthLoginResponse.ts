import { ApiProperty } from '@nestjs/swagger';
import { AuthRefreshResponse } from './AuthRefreshResponse';

export class AuthLoginResponse extends AuthRefreshResponse {
  @ApiProperty()
    refreshToken: string;
}