import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
export class ResourceResponse {
  @ApiProperty({
    description: 'Id of specific student resource',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Link to student resource',
  })
  @AutoMap()
    link: string;

  @ApiProperty({
    description: 'Name of student resource',
  })
  @AutoMap()
    name: string;

  @ApiProperty({
    description: 'icon of student resource',
  })
  @AutoMap()
    imageLink: string;
}
