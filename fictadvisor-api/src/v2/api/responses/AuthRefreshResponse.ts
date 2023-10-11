import { ApiProperty } from '@nestjs/swagger';

export class AuthRefreshResponse {
  @ApiProperty({
    description: 'A token to access to protected resourses',
  })
    accessToken: string;
}