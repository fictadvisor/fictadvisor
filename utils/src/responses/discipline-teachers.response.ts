import { ApiProperty } from '@nestjs/swagger';
import { SubjectResponse } from './subject.response';
import { DisciplineTeacherResponse } from './discipline-teacher.response';
import { GroupResponse } from './group.response';
import { AutoMap } from '@automapper/classes';

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
  @AutoMap()
    id: string;

  @ApiProperty({
    type: SubjectResponse,
    description: 'Subject of a discipline',
  })
  @AutoMap(() => SubjectResponse)
    subject: SubjectResponse;

  @ApiProperty({
    description: 'Year for which disciplines where selected',
  })
  @AutoMap()
    year: number;

  @ApiProperty({
    description: 'Semester for which disciplines where selected',
  })
  @AutoMap()
    semester: number;

  @ApiProperty({
    description: 'Discipline can be selected',
  })
  @AutoMap()
    isSelective: boolean;

  @ApiProperty({
    description: 'Disciplines group',
  })
  @AutoMap(() => GroupResponse)
    group: GroupResponse;
}

export class ExtendedDisciplinesTeachersResponse {
  @ApiProperty({
    type: [ExtendedDisciplineTeachersResponse],
    description: 'List of disciplines',
  })
    disciplines: ExtendedDisciplineTeachersResponse[];
}
