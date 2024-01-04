import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './CathedraResponse';
import { TeacherResponse } from './TeacherResponse';

export class CathedraWithTeachersResponse  extends CathedraResponse {
  @ApiProperty({
    description: 'List of teachers associated with the cathedra',
    type: [TeacherResponse],
  })
    teachers: TeacherResponse[];
}
