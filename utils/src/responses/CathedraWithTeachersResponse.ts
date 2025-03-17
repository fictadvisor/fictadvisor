import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './CathedraResponse';
import { TeacherResponse } from './TeacherResponse';
import { AutoMap } from '@automapper/classes';

export class CathedraWithTeachersResponse extends CathedraResponse {
  @ApiProperty({
    description: 'List of teachers associated with the cathedra',
    type: [TeacherResponse],
  })
  @AutoMap(() => [TeacherResponse])
    teachers: TeacherResponse[];
}
