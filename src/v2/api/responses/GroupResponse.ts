import { ApiProperty } from '@nestjs/swagger';

export class GroupResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    code: string;
}