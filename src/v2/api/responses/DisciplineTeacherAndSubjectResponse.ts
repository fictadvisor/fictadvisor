import { ApiProperty } from '@nestjs/swagger';

export class DisciplineTeacherAndSubjectResponse {
  @ApiProperty()
    disciplineTeacherId: string;
  
  @ApiProperty()
    subjectName: string;
}