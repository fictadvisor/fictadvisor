import { CathedraResponse } from './CathedraResponse';
import { ApiProperty } from '@nestjs/swagger';


export class CathedraWithNumberOfTeachersResponse extends CathedraResponse {
  @ApiProperty({
    description: 'Number of teachers associated with the cathedra',
  })
    teachers: number;
}