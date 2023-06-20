import { ApiProperty } from '@nestjs/swagger';

export class SubjectResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;
}