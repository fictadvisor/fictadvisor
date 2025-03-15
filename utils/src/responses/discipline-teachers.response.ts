import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './subject.response';
import { DisciplineTeacherResponse } from './discipline-teacher.response';
import { GroupResponse } from './group.response';

export class DisciplineTeachersResponse {
  @ApiProperty({
    type: [DisciplineTeacherResponse],
    description: 'List of teachers of the specific discipline',
  })
    teachers: DisciplineTeacherResponse[];
}

export class ExtendedDisciplineTeachersResponse extends DisciplineTeachersResponse {
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
    description: 'Disciplines group',
  })
    group: GroupResponse;
}

export class ExtendedDisciplinesTeachersResponse {
  @ApiProperty({
    type: [ExtendedDisciplineTeachersResponse],
    description: 'List of disciplines',
  })
    disciplines: ExtendedDisciplineTeachersResponse[];
}
