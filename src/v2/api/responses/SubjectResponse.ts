import { ApiProperty } from '@nestjs/swagger';

export class SubjectResponse {
  @ApiProperty({
    description: 'Id of a specific subject',
  })
    id: string;

  @ApiProperty({
    description: 'Name of a specific subject',
  })
    name: string;
}