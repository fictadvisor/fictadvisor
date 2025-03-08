import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class DisciplineTeacherAndSubjectResponse {
  @ApiProperty({
    description: 'Id of a specific discipline',
  })
  @AutoMap()
    disciplineTeacherId: string;

  @ApiProperty({
    description: 'Name of a specific subject',
  })
  @AutoMap()
    subjectName: string;
}
