import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';
import { ExtendTeacherResponse } from './TeacherResponse';
import { DisciplineTeacherResponse } from './DisciplineTeacherResponse';

export class DisciplineTeachersResponse {
  @ApiProperty({
    type: [DisciplineTeacherResponse],
    description: 'Array of discipline teacher objects',
  })
    teachers: DisciplineTeacherResponse[];
}

export class ExtendDisciplineTeachersResponse {
  @ApiProperty({
    description: 'Id of the discipline extended with teachers',
  })
    id: string;

  @ApiProperty({
    type: SubjectResponse,
    description: 'Subject of a discipline',
  })
    subject: SubjectResponse;

  @ApiProperty({
    description: 'Year for which disciplines where selected',
  })
    year: number;

  @ApiProperty({
    description: 'Semester for which disciplines where selected',
  })
    semester: number;

  @ApiProperty({
    description: 'Discipline can be selected',
  })
    isSelective: boolean;

  @ApiProperty({
    type: [ExtendTeacherResponse],
    description: 'List of teachers of the specific discipline',
  })
    teachers: ExtendTeacherResponse[];
}
