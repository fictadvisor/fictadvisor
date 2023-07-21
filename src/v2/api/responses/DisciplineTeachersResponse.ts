import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTeacherResponse } from './DisciplineTeacherResponse';

export class DisciplineTeachersResponse {
  @ApiProperty({
    type: [DisciplineTeacherResponse],
  })
    teachers: DisciplineTeacherResponse[];
}
