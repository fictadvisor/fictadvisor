import { ApiProperty } from '@nestjs/swagger';
import { DisciplineResponse } from './DisciplineResponse';
import { GroupResponse } from './GroupResponse';
import { SubjectResponse } from './SubjectResponse';
import { TeacherResponse } from './TeacherResponse';
import { DisciplineTypeEnum } from '../enums/db/DisciplineTypeEnum';
import { TeacherRole } from '../enums/db/TeacherRoleEnum';

class DisciplineType {
  @ApiProperty()
    id: string;
  
  @ApiProperty()
    disciplineId: string;

  @ApiProperty({
    enum: DisciplineTypeEnum,
  })
    name: DisciplineTypeEnum;
}

class Discipline extends DisciplineResponse {
  @ApiProperty({
    type: GroupResponse,
  })
    group: GroupResponse;

  @ApiProperty({
    type: SubjectResponse,
  })
    subject: SubjectResponse;

  @ApiProperty({
    type: [DisciplineType],
  })
    disciplineTypes: DisciplineType[];
}

export class DisciplineTeacherCreateResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    teacherId: string;

  @ApiProperty()
    disciplineId: string;

  @ApiProperty({
    type: Discipline,
  })
    discipline: DisciplineResponse;

  @ApiProperty({
    type: TeacherResponse,
  })
    teacher: TeacherResponse;

  @ApiProperty({
    enum: TeacherRole,
    type: [TeacherRole],
  })
    roles: TeacherRole[];
}