import { ApiProperty } from '@nestjs/swagger';
import { TeacherRole } from '@prisma/client';

class Subject {

  @ApiProperty({
    description: 'Id of subject',
  })
    id: string;

  @ApiProperty({
    description: 'Name of subject',
  })
    name: string;
}

class DisciplineTeachers {

  @ApiProperty({
    description: 'Id of discipline teacher',
  })
    disciplineTeacherId: string;

  @ApiProperty({
    type: [TeacherRole],
    enum: TeacherRole,
    description: 'An enum of teacher\'s roles',
  })
    roles: TeacherRole[];

  @ApiProperty({
    description: 'Firstname of discipline teacher',
  })
    firstName: string;

  @ApiProperty({
    description: 'Middlename of discipline teacher',
  })
    middleName: string;

  @ApiProperty({
    description: 'Lastname of discipline teacher',
  })
    lastName: string;

  @ApiProperty({
    description: 'Avatar of discipline teacher',
  })
    avatar: string;

  @ApiProperty({
    description: 'Discipline teacher\'s subject',
  })
    subject: Subject;
}

export class PollDisciplineTeachersResponse {

  @ApiProperty({
    description: 'Show was teacher selected in last semester',
  })
    hasSelectedInLastSemester:boolean;

  @ApiProperty({
    type: [DisciplineTeachers],
    description: 'Information about the teacher\'s discipline',
  })
    teachers: DisciplineTeachers[];
}