import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './cathedra.response';
import { TeacherResponse } from './teacher.response';
import { AutoMap } from '@automapper/classes';

export class CathedraWithTeachersResponse extends CathedraResponse {
  @ApiProperty({
    description: 'List of teachers associated with the cathedra',
    type: [TeacherResponse],
  })
  @AutoMap(() => [TeacherResponse])
    teachers: TeacherResponse[];
}
