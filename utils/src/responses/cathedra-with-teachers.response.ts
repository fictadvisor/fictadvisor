import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './cathedra.response';
import { TeacherResponse } from './teacher.response';

export class CathedraWithTeachersResponse extends CathedraResponse {
  @ApiProperty({
    description: 'List of teachers associated with the cathedra',
    type: [TeacherResponse],
  })
    teachers: TeacherResponse[];
}
