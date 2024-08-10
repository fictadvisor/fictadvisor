import { ApiProperty } from '@nestjs/swagger';

export class GoogleCheckGrantsResponse {
  @ApiProperty({
    description: 'Check whether the user has granted the requested Google scopes to our application',
  })
    hasGrantedAccess: boolean;
}
