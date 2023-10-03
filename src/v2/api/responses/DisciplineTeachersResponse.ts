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
  @ApiProperty()
    id: string;

  @ApiProperty({
    type: SubjectResponse,
  })
    subject: SubjectResponse;

  @ApiProperty()
    year: number;

  @ApiProperty()
    semester: number;

  @ApiProperty()
    isSelective: boolean;

  @ApiProperty({
    type: [ExtendTeacherResponse],
  })
    teachers: ExtendTeacherResponse[];
}
