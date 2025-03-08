import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class SubjectResponse {
  @ApiProperty({
    description: 'Id of a specific subject',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Name of a specific subject',
  })
  @AutoMap()
    name: string;
}
