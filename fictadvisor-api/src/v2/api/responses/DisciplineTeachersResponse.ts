import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './SubjectResponse';
import { DisciplineTeacherResponse } from './DisciplineTeacherResponse';

export class DisciplineTeachersResponse {
  @ApiProperty({
    type: [DisciplineTeacherResponse],
    description: 'List of teachers of the specific discipline',
  })
    teachers: DisciplineTeacherResponse[];
}

export class ExtendDisciplineTeachersResponse extends DisciplineTeachersResponse {
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
}
