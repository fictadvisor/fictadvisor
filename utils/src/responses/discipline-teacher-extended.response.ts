import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './teacher.response';
import { ExtendedDisciplineResponse } from './discipline.response';
import { DisciplineTypeEnum } from '../enums';

export class DisciplineTeacherExtendedResponse {
  @ApiProperty({
    description: 'Id of the disciplineTeacher',
  })
    id: string;

  @ApiProperty({
    description: 'Teacher id of the disciplineTeacher',
  })
    teacherId: string;

  @ApiProperty({
    description: 'Discipline id of the disciplineTeacher',
  })
    disciplineId: string;

  @ApiProperty({
    description: 'Discipline of the disciplineTeacher',
    type: ExtendedDisciplineResponse,
  })
    discipline: ExtendedDisciplineResponse;

  @ApiProperty({
    description: 'Teacher of the disciplineTeacher',
    type: TeacherResponse,
  })
    teacher: TeacherResponse;

  @ApiProperty({
    description: 'Discipline types of the disciplineTeacher',
    enum: DisciplineTypeEnum,
    type: [DisciplineTypeEnum],
  })
    disciplineTypes: DisciplineTypeEnum[];
}
