import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTeacherFullResponse } from './discipline-teacher.response';

export class PollDisciplineTeachersResponse {
  @ApiProperty({
    description: 'Show was teacher selected in last semester',
  })
    hasSelectedInLastSemester: boolean;

  @ApiProperty({
    type: [DisciplineTeacherFullResponse],
    description: 'Information about the teacher\'s discipline',
  })
    teachers: DisciplineTeacherFullResponse[];
}
