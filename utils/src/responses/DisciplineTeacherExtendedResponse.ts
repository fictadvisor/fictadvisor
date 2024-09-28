import { ApiProperty } from '@nestjs/swagger';
import { TeacherResponse } from './TeacherResponse';
import { TeacherRole } from '../enums/';
import { ExtendedDisciplineResponse } from './DisciplineResponse';

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
    description: 'Teacher roles of the disciplineTeacher',
    enum: TeacherRole,
    type: [TeacherRole],
  })
    roles: TeacherRole[];
}
