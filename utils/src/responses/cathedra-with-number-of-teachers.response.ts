import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './cathedra.response';
import { AutoMap } from '@automapper/classes';


export class CathedraWithNumberOfTeachersResponse extends CathedraResponse {
  @ApiProperty({
    description: 'Number of teachers associated with the cathedra',
  })
  @AutoMap()
    teachers: number;
}
