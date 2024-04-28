import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './CathedraResponse';


export class CathedraWithNumberOfTeachersResponse extends CathedraResponse {
  @ApiProperty({
    description: 'Number of teachers associated with the cathedra',
  })
    teachers: number;
}