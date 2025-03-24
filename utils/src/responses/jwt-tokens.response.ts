import { ApiProperty } from '@nestjs/swagger';

export class JWTTokensResponse {
  @ApiProperty({
    description: 'Token that extends authentication without re-entering credentials',
  })
    refreshToken: string;

  @ApiProperty({
    description: 'A temporary access token for user data or resources',
  })
    accessToken: string;
}