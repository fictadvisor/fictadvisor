import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum, TeacherRole } from '@prisma/client';
import { DisciplineResponse } from './DisciplineResponse';
import { GroupResponse } from './GroupResponse';
import { SubjectResponse } from './SubjectResponse';
import { TeacherResponse } from './TeacherResponse';

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

class DisciplineTeacherRole {
  @ApiProperty()
    disciplineTeacherId: string;

  @ApiProperty()
    disciplineTypeId: string;

  @ApiProperty({
    enum: TeacherRole,
  })
    role: TeacherRole;
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
    type: [DisciplineTeacherRole],
  })
    roles: DisciplineTeacherRole[];
}