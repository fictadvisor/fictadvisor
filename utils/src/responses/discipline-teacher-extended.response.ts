import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './teacher.response';
import { ExtendedDisciplineResponse } from './discipline.response';
import { DisciplineTypeEnum } from '../enums';
import { AutoMap } from '@automapper/classes';

export class DisciplineTeacherExtendedResponse {
  @ApiProperty({
    description: 'Id of the disciplineTeacher',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Teacher id of the disciplineTeacher',
  })
  @AutoMap()
    teacherId: string;

  @ApiProperty({
    description: 'Discipline id of the disciplineTeacher',
  })
  @AutoMap()
    disciplineId: string;

  @ApiProperty({
    description: 'Discipline of the disciplineTeacher',
    type: ExtendedDisciplineResponse,
  })
  @AutoMap(() => ExtendedDisciplineResponse)
    discipline: ExtendedDisciplineResponse;

  @ApiProperty({
    description: 'Teacher of the disciplineTeacher',
    type: TeacherResponse,
  })
  @AutoMap(() => TeacherResponse)
    teacher: TeacherResponse;

  @ApiProperty({
    description: 'Discipline types of the disciplineTeacher',
    enum: DisciplineTypeEnum,
    type: [DisciplineTypeEnum],
  })
  @AutoMap(() => [String])
    disciplineTypes: DisciplineTypeEnum[];
}
