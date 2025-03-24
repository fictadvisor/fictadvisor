import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './cathedra.response';


export class CathedraWithNumberOfTeachersResponse extends CathedraResponse {
  @ApiProperty({
    description: 'Number of teachers associated with the cathedra',
  })
    teachers: number;
}
